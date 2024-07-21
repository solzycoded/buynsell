import UserProductController from "../controllers/UserProductController.js";
import SessionService from "../services/SessionService.js";
import express from "express";

const router = express.Router();

// Define routes
router.get('/:limit', SessionService.isAuthenticated, UserProductController.index);
router.get('/', SessionService.isAuthenticated, UserProductController.index);
router.get('/find/:productId', SessionService.isAuthenticated, UserProductController.find);
router.delete('/', SessionService.isAuthenticated, UserProductController.deleteProduct);

router.put('/:productId', SessionService.isAuthenticated, UserProductController.update);

// export routes
let userProductRoutes = {
    router
}

export default userProductRoutes;