import CustomerContactController from "../controllers/CustomerContactController.js";
import express from "express";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
router.get('/', SessionService.isAuthenticated, CustomerContactController.findCustomerContact);

// export routes
let customerContactRoutes = {
    router
}

export default customerContactRoutes;