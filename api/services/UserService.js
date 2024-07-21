import User from "../models/User.js";
import bcrypt from "bcrypt";
import UserRoleService from "./UserRoleService.js";
import "dotenv/config";

const UserService = (() => {
    /* create default list of user roles */
    const createAdmin = async () => {
        // insert admin data
        const env   = process.env;

        bcrypt.hash(env.ADMIN_PASSWORD, 10, (err, hash) => {
            const create = async () => {
                try{
                    let user        = await User.findOne({ email: env.ADMIN_EMAIL }).exec();
                    const adminRole = await UserRoleService.getRoleId("admin");

                    if(adminRole && !user){
                        user = new User({ 
                            name: env.ADMIN_NAME, 
                            email: env.ADMIN_EMAIL, 
                            password: hash, 
                            email_verified: true, 
                            user_role: adminRole 
                        });

                        user.save();
                    }
                } catch(err){
                    // console.log(err);
                }
            }
            create();
        });
    }
    createAdmin();

    const userExists = async (target) => {
        const user = await User.findOne(target).exec();

        return user!=null;
    }

    const findUserByEmail = async (email) => {
        const user = await User
            .findOne({ email })
            .populate("user_role", "name -_id")
            .exec();

        return user;
    }

    const updateUser = async (id, data) => {
        return await User.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    return {
        userExists,
        findUserByEmail,
        updateUser,
    }

})();

export default UserService;

// GRASP PATTERN
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection
*/