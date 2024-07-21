import StatusController from "../controllers/StatusController.js";
import express from "express";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
router.get('/', SessionService.isAuthenticated, StatusController.allStatus);

// export routes
let statusRoutes = {
    router
}

export default statusRoutes;