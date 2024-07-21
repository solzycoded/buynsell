import ShoppingCart from "../models/ShoppingCart.js";

const ShopppingCartService = (() => {
    const addProductToCart = async (details) => {
        const cart = new ShoppingCart({ 
            product: details.productId, 
            quantity: details.quantity, 
            user: details.userId, 
        });

        await cart.save();
    }

    const findProductInCart = async (productId, userId) => {
        const cart = await ShoppingCart.findOne({ product: productId, user: userId}).exec();

        return cart;
    }

    const removeProductFromCart = async (cartId) => {
        await ShoppingCart.deleteOne({_id: cartId});
    }

    const listOfCartItems = async (userId, all = true) => {
        const quantityQuery = all ? { $gte: 0 } : { $gt: 0};
        const cartItems = await ShoppingCart.find({ user: userId, quantity: quantityQuery })
            .populate({
                path: "product",
                populate: [
                    {
                        "path": "category"
                    },
                    {
                        "path": "images"
                    }
                ],
            })
            .exec();

        return cartItems;
    }

    const updateCartQuantity = async (productId, userId, quantity) => {
        // const itemInCart = await findProductInCart(productId, userId);
        const filter = { product: productId, user: userId };
        const update = { quantity };

        const result = await ShoppingCart.updateOne(filter, update, { runValidators: true }).exec();

        return result;
    }

    const getCartTotal = async (user) => {
        const cartItems = await listOfCartItems(user, false);
        let total       = 0;

        cartItems.forEach((item) => {
            total += item.product.price * item.quantity;
        });

        return total;
    }

    const emptyCart = async (user) => {
        await ShoppingCart.deleteMany({ user }).exec();
    }

    return {
        addProductToCart,
        findProductInCart,
        removeProductFromCart,
        listOfCartItems,
        updateCartQuantity,
        getCartTotal,
        emptyCart,
    }

})();

export default ShopppingCartService;

// GRASP PATTERNS
/*
    1. information expert
    2. pure fabrication
    3. indirection
    4. low coupling
    5. high cohesion
*/