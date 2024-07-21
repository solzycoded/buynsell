import ProductStatusController from "../controllers/ProductStatusController.js";
import express from "express";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
router.post('/', SessionService.isAuthenticated, ProductStatusController.productStatus);

// export routes
let productStatusRoutes = {
    router
}

export default productStatusRoutes;