import LoginController from "../controllers/LoginController.js";
import express from "express";

const router = express.Router();

// Define routes
router.post('/', LoginController.login);

// export routes
let loginRoutes = {
    router
}

export default loginRoutes;