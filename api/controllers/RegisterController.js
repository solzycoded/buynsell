import RegisterService from "../services/RegisterService.js";
import SessionService from "../services/SessionService.js";
import UserService from "../services/UserService.js";
import App from "../util/app.js";

const registerUser = async(req, res)  => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(500).json({ success: false, message: "Some fields are missing" });

        return;
    }

    try {
        // check...
        const emailExists = await UserService.userExists({ email }); // if email already exists
        const nameExists  = await UserService.userExists({ name }); // if name already exists

        // if either name or email exists send a 400 response with a message and return
        if(emailExists || nameExists){
            res.status(400).json({ success: false, data: "Username or Email already exists" });

            return;
        }

        // else, create the new user
        const token       = App.createToken();
        const userCreated = await RegisterService.createNewUser(token, name, email, password);

        if(userCreated){
            // create user session
            const user  = {id: "", name, token, email, verified: false, time: Date.now(), role: "customer"};
            SessionService.set(user, req);

            res.status(201).json({ success: true, data: "Registration successful! You can now Login." });
            return;
        }

        // if token is null, something went wrong with encrypting the new password
        res.status(201).json({ success: false, data: "Something went wrong. User has not been registered!" });
    } catch (error) {
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const RegisterController = {
    registerUser
}

export default RegisterController;

// GRASP PATTERNS
/* 
    1. controller (use case) *
*/