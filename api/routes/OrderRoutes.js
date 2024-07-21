import express from "express";
import SessionService from "../services/SessionService.js";
import BuyerOrderController from "../controllers/BuyerOrderController.js";
import SellerOrderController from "../controllers/SellerOrderController.js";

const router = express.Router();

// Define routes
// BUYER ORDERS
router.post('/', SessionService.isAuthenticated, BuyerOrderController.createOrder);
router.post('/pre', SessionService.isAuthenticated, BuyerOrderController.createPreOrder);
router.post('/initiate-stripe-payment', SessionService.isAuthenticated, BuyerOrderController.initiateStripePayment);

router.get('/buyer', SessionService.isAuthenticated, BuyerOrderController.getOrders);
router.get('/buyer/:limit', SessionService.isAuthenticated, BuyerOrderController.getOrders);
router.post('/buyer/cancel', SessionService.isAuthenticated, BuyerOrderController.cancelOrder);

// SELLER ORDERS
router.get('/seller/:limit', SessionService.isAuthenticated, SellerOrderController.getOrders);
router.get('/seller', SessionService.isAuthenticated, SellerOrderController.getOrders);
router.get('/seller/find/:orderId', SessionService.isAuthenticated, SellerOrderController.getOrder);
router.post('/seller/:orderId', SessionService.isAuthenticated, SellerOrderController.updateOrder);

// export routes
let orderRoutes = {
    router
}

export default orderRoutes;