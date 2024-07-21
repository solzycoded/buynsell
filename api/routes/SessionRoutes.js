import SessionController from "../controllers/SessionController.js";
import express from "express";

const router = express.Router();

// Define routes
router.get('/', SessionController.checkAuth);
router.post('/log-out', SessionController.logout);

// export routes
let sessionRoutes = {
    router
}

export default sessionRoutes;