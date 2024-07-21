import Model from "./model.js";

const Category = (() => {
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
                message: 'Category already exists'
            }
        },
    };

    return Model.schemaModel("Category", fields);
})();

export default Category;

// GRASP PATTERN
/* 
    1. information expert
    
*/