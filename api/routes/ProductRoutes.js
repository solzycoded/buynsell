import ProductController from "../controllers/ProductController.js";
import express from "express";
import SessionService from "../services/SessionService.js";
import SearchProductController from "../controllers/SearchProductController.js";

const router = express.Router();

// Define routes
router.get('/', ProductController.index);
router.post('/for-admin', SessionService.isAuthenticated, ProductController.indexAll);
router.get('/for-admin', SessionService.isAuthenticated, ProductController.indexAll);

router.get('/:productId', ProductController.find);
router.get('/search/:searchQuery', SearchProductController.index);

router.post('/', SessionService.isAuthenticated, ProductController.create); // create a product

// export routes
let productRoutes = {
  router
}

export default productRoutes;