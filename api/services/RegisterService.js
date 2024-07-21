import User from "../models/User.js";
import HashService from "./HashService.js";
import UserRoleService from "./UserRoleService.js";

const RegisterService = (() => {
    let userData    = {};
    let userCreated = true;

    // this function implements "indirection", it acts as the intermediary between the object it's in and the HashService 
    const createNewUser = async (token, name, email, password) => {
        userData = { name, email, token };

        // encrypt the password
        HashService.encrypt(password, saveUser);

        // return true, if the new user has been created
        return userCreated;
    }

    const saveUser = async (err, password) => {
        if (err) {
            userCreated = false;
            return;
        }

        const userRole = await UserRoleService.getRoleId("customer"); // get customer userroleid

        const user = new User({ name: userData.name, email: userData.email, password, token: userData.token, user_role: userRole }); // create new user object

        user.save(); // save user
    }

    return {
        createNewUser
    }
})();

export default RegisterService;

// GRASP PATTERNS
/*
    1. pure fabrication
        : responsibility (create a new User)

    2. high cohesion
    3. low coupling
*/