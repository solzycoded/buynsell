import Model from "./model.js";

const Status = (() => {
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
                message: 'Status already exists'
            }
        },
    };

    return Model.schemaModel("Status", fields);
})();

export default Status;

// GRASP PATTERN
/* 
    1. information expert
    
*/