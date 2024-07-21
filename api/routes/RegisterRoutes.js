import RegisterController from "../controllers/RegisterController.js";
import express from "express";

const router = express.Router();

// Define routes
router.post('/', RegisterController.registerUser);

// export routes
let registerRoutes = {
    router
}

export default registerRoutes;