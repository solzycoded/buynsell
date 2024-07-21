import CategoryController from "../controllers/CategoryController.js";
import express from "express";

const router = express.Router();

// Define routes
router.get('/', CategoryController.allCategories);

// export routes
let categoryRoutes = {
    router
}

export default categoryRoutes;