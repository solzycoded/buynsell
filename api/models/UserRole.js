import Model from "./model.js";

const UserRole = (() => {
    const fields = {
        name: {
            type: String, 
            required: true, 
            unique: true,
            validate: {
                validator: function(value) {
                    return this.constructor.findOne({ name: value })
                        .then(existingUser => !existingUser);
                },
                message: 'Name already exists'
            }
        },
    };

    return Model.schemaModel("User_Role", fields);
})();

export default UserRole;

// GRASP PATTERN
/* 
    1. information expert
    
*/