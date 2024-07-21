import WishlistController from "../controllers/WishlistController.js";
import express from "express";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
router.post('/', SessionService.isAuthenticated, WishlistController.updateWishlist);
router.get('/confirm/:productId', WishlistController.checkProductInWishlist);

// export routes
let wishlistRoutes = {
    router
}

export default wishlistRoutes;