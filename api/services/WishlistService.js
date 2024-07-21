import Wishlist from "../models/Wishlist.js";

const WishlistService = (() => {
    const addProductToWishlist = async (details) => {
        const wishlistModel = new Wishlist({ 
            product: details.productId, 
            user: details.userId, 
        });

        await wishlistModel.save();
    }

    const findProductInWishlist = async (productId, userId) => {
        const wishlistItem = await Wishlist.findOne({ product: productId, user: userId}).exec();

        return wishlistItem;
    }

    const removeProductFromWishlist = async (wishlistId) => {
        await Wishlist.deleteOne({_id: wishlistId});
    }

    return {
        addProductToWishlist,
        findProductInWishlist,
        removeProductFromWishlist,
    }

})();

export default WishlistService;