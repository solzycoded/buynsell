import WishlistService from "../services/WishlistService.js";

const updateWishlist = async(req, res) => {
    const { productId } = req.body;

    if(!productId) {
        res.status(500).json({ success: false, data: "ProductId is missing!" });
        return;
    }

    try {
        const userId       = req.session.user.id;
        const wishlistItem = await WishlistService.findProductInWishlist(productId, userId);

        let responseMsg    = "";

        // IF product exists for the user in wishlist
        if(wishlistItem){ // remove item from wishlist
            await WishlistService.removeProductFromWishlist(wishlistItem._id);
            responseMsg = "Product was successfully removed from wishlist!";
        }
        else{ // add item to wishlist
            await WishlistService.addProductToWishlist({ productId, userId });
            responseMsg = "Product was successfully added to wishlist!";
        }

        res.status(201).json({ success: true, data: responseMsg });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const checkProductInWishlist = async(req, res) => {
    const { productId } = req.params;

    if(!productId || !req.session.user) {
        res.status(201).json({ success: false, data: "User is not logged in or Product Id is missing" });
        return;
    }

    try {
        const userId = req.session.user.id;
        const wishlistItem   = await WishlistService.findProductInWishlist(productId, userId);

        res.status(201).json({ success: true, data: {inWishlist: (wishlistItem ? true : false)} });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const WishlistController = {
    updateWishlist,
    checkProductInWishlist,
}

export default WishlistController;

// GRASP PATTERNS
/* 
    1. controller (facade)
    2. high cohesion
*/