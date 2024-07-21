import AddressController from "../controllers/AddressController.js";
import express from "express";
import SessionService from "../services/SessionService.js";

const router = express.Router();

// Define routes
router.get('/', SessionService.isAuthenticated, AddressController.allAddresses);
router.post('/', SessionService.isAuthenticated, AddressController.createAddress);
router.delete('/:addressId', SessionService.isAuthenticated, AddressController.deleteAddress);

// export routes
let addressRoutes = {
    router
}

export default addressRoutes;