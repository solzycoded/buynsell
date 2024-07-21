import ShoppingCartController from "../controllers/ShoppingCartController.js";
import express from "express";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
router.post('/', SessionService.isAuthenticated, ShoppingCartController.updateCart);
router.put('/:productId', SessionService.isAuthenticated, ShoppingCartController.updateCartQuantity);
router.get('/confirm/:productId', ShoppingCartController.checkProductInCart);
router.get('/', SessionService.isAuthenticated, ShoppingCartController.index);
router.get('/total', SessionService.isAuthenticated, ShoppingCartController.getCartTotal);

// export routes
let shoppingCartRoutes = {
    router
}

export default shoppingCartRoutes;