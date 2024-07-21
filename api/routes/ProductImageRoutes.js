import express from "express";
import ProductImageService from "../services/ProductImageService.js";
import ProductImageController from "../controllers/ProductImageController.js";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
const upload             = ProductImageService.createMulterStorage();
const myUploadMiddleware = upload.array("pictures", 6);

router.post('/:productId', myUploadMiddleware, ProductImageController.create);

router.delete('/:productImageId', SessionService.isAuthenticated, ProductImageController.destroy);

// export routes
let productImageRoutes = {
  router
}

export default productImageRoutes;