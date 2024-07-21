import ProfileController from "../controllers/ProfileController.js";
import ProductImageService from "../services/ProductImageService.js";
import SessionService from "../services/SessionService.js";
import express from "express";

const router = express.Router();

// Define routes
router.get('/', SessionService.isAuthenticated, ProfileController.find); // find a profile
router.post('/confirm-password', SessionService.isAuthenticated, ProfileController.passwordConfirmation); // confirm your password

const upload             = ProductImageService.createMulterStorage("profile");
const myUploadMiddleware = upload.single("displayPic");

router.post('/', myUploadMiddleware, ProfileController.update);

// export routes
let profileRoutes = {
    router
}

export default profileRoutes;