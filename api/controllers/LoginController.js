import LoginService from "../services/LoginService.js";
import SessionService from "../services/SessionService.js";
import UserService from "../services/UserService.js";
import App from "../util/app.js";

const login = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(500).json({ success: false, message: "Some fields are missing!" });
        return;
    }

    try {
        // check...
        const emailExists = await UserService.userExists({ email }); // if email already exists

        // if either name or email exists send a 400 response with a message and return
        if(!emailExists){
            res.status(400).json({ success: false, data: "Invalid Credentials Provided" });
            return;
        }

        // else, create the new user and return their token
        const user = await LoginService.confirmLoginDetails(email, password);

        if(!user){
            res.status(400).json({ success: false, data: { message: "The Credentials you provided are invalid!" } });
            return;
        }

        // finalize login
        const token = App.createToken(); // create new token

        UserService.updateUser(user._id, { token }); // update user token

        // create new session user values
        const userData = {id: user._id, name: user.name, token, email: user.email, verified: (user.verified ? user.verified : false), time: Date.now(), role: user.user_role.name};
        SessionService.set(userData, req); // create user session

        res.status(201).json({ success: true, data: `Welcome ${user.name}!` });
    } catch (error) {
        res.status(500).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const LoginController = {
    login
}

export default LoginController;

// GRASP PATTERNS
/*
    1. controller (use case) *
*/