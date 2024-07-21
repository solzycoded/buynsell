import Model from "./model.js";

const Country = (() => {
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
                message: 'Country already exists'
            }
        },
    };

    return Model.schemaModel("Country", fields);
})();

export default Country;

// GRASP PATTERN
/* 
    1. information expert
    
*/