import UserRole from "../models/UserRole.js";
import data from "../util/data.js";

const UserRoleService = (() => {
    /* create default list of user roles */
    const createDefaultRoles = async () => {
        UserRole.insertMany(data.roles)
            .then((docs) => {
                console.log('Multiple roles inserted');
            })
            .catch((err) => {
                // console.error('Error inserting records: ', err);
            });
    }
    createDefaultRoles();

    const getRoleId = async (name) => {
        const role = await UserRole.findOne({ name }).exec();

        return role ? role._id : null;
    }

    const getRoleName = async (roleId) => {
        const role = await UserRole.findOne({ _id: roleId }).exec();

        return role ? role.name : null;
    }

    return {
        getRoleId,
        getRoleName,
    }

})();

export default UserRoleService;

// GRASP PATTERNS
/*
    1. pure fabrication
        : responsibility (communicate with the UserRole model)

    2. high cohesion
    3. low coupling
*/