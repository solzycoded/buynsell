import ProfileService from "../services/ProfileService.js";
import UserService from "../services/UserService.js";

const find = async(req, res) => {
    try {
        const user    = req.session.user;
        const profile = await ProfileService.findUserProfile(user.id);

        res.status(201).json({ success: (profile && profile.id ? true : false), data: profile });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
}

const passwordConfirmation = async(req, res) => {
    const { password } = req.body;

    if(!password){
        res.status(403).json({ success: false, data: "Password value is missing!" });
        return;
    }

    try {
        const user    = req.session.user;

        // confirm user password
        await ProfileService.confirmPassword(user.id, password, res);
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
}

const update = async(req, res) => {
    if(!req.session.user){
        res.status(401).json({ success: false, data: "You're not authorized to perform this action!" });
        return;
    }

    const { email, name, businessName, businessAddress, startedOn, services } = req.body;

    if(!email || !name){
        res.status(403).json({ success: false, data: "Email or Username is missing!" });
        return;
    }

    try {
        const user    = req.session.user.id;

        // update user details
        await UserService.updateUser(user, { email, name });

        // update profile
        const imageFile = req.file;
        await ProfileService.updateProfile(user, businessName, businessAddress, startedOn, services, imageFile);

        res.status(202).json({ success: true, data: "Profile was successfully updated!" });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
}

// export CONTROLLER
const ProductController = {
    find,
    passwordConfirmation,
    update,
}

export default ProductController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/