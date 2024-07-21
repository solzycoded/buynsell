import HashService from "./HashService.js";
import UserService from "./UserService.js";

const LoginService = (() => {
    const confirmLoginDetails = async (email, password) => {
        const user = await UserService.findUserByEmail(email); // find user by email
    
        // decrypt and confirm the password
        const passwordIsValid = await HashService.decrypt(password, user.password);
    
        if(passwordIsValid){
            return user;
        }

        return null;
    }

    return {
        confirmLoginDetails,
    };
})();

export default LoginService;

// GRASP PATTERNS
/*
    1. pure fabrication (responsibility: handle the login action, confirmlogindetails) *
    2. high cohesion *
    3. low coupling *
    4. indirection
*/
