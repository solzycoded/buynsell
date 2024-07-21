import ShopppingCartService from "../services/ShoppingCartService.js";

const updateCart = async(req, res) => {
    const { productId, quantity } = req.body;

    if(!productId) {
        res.status(500).json({ success: false, data: "ProductId is missing!" });
        return;
    }

    try {
        const userId    = req.session.user.id;
        const cart      = await ShopppingCartService.findProductInCart(productId, userId);

        let responseMsg = "";

        // IF product exists for the user in cart
        if(cart){ // remove item from cart
            await ShopppingCartService.removeProductFromCart(cart._id);
            responseMsg = "Product was successfully removed from cart!";
        }
        else{ // add item to cart
            await ShopppingCartService.addProductToCart({ productId, quantity, userId });
            responseMsg = "Product was successfully added to cart!";
        }

        res.status(201).json({ success: true, data: responseMsg });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const checkProductInCart = async(req, res) => {
    const { productId } = req.params;

    if(!productId || !req.session.user) {
        res.status(201).json({ success: false, data: "User is not logged in or Product Id is missing" });
        return;
    }

    try {
        const userId = req.session.user.id;
        const cart   = await ShopppingCartService.findProductInCart(productId, userId);

        res.status(201).json({ success: true, data: {inCart: (cart ? true : false)} });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const index = async(req, res)  => {
    try {
        const user      = req.session.user;
        const cartItems = await ShopppingCartService.listOfCartItems(user.id);

        res.status(201).json({ success: true, data: cartItems });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const updateCartQuantity = async(req, res) => {
    const { quantity }  = req.body;
    const { productId } = req.params;

    if(!productId || quantity===null) {
        res.status(500).json({ success: false, data: "ProductId or Quantity is missing!" });
        return;
    }

    try {
        const userId = req.session.user.id;
        const cart   = await ShopppingCartService.updateCartQuantity(productId, userId, quantity);
        const cartUpdatedSuccessfully = cart.matchedCount > 0;

        res.status(201).json({ success:cartUpdatedSuccessfully, data: (cartUpdatedSuccessfully ? "" : "Product does not exist in cart!") });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const getCartTotal = async(req, res) => {
    if(!req.session.user.order){
        res.status(500).json({ success: false, data: "You're not authorized to perform this action!" });
        return;
    }

    try {
        const user  = req.session.user.id;
        const total = await ShopppingCartService.getCartTotal(user);

        res.status(201).json({ success: true, data: { amount: total }});
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const ShoppingCartController = {
    updateCart,
    checkProductInCart,
    index,
    updateCartQuantity,
    getCartTotal,
}

export default ShoppingCartController;

// GRASP PATTERNS
/* 
    1. controller (facade)
    2. high cohesion
*/