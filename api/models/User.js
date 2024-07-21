import { Schema } from "mongoose";
import Model from "./model.js";

const User = (() => {
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
        email: {
            type: String, 
            required: true, 
            unique: true,
            validate: {
                validator: function(value) {
                    return this.constructor.findOne({ email: value })
                        .then(existingUser => !existingUser);
                },
                message: 'Email already exists'
            }
        },
        email_verified: {
            type: Boolean, 
            default: false,
        },
        token: {
            type: String, 
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        user_role:  {
            type: Schema.Types.ObjectId, 
            ref: 'User_Role'
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    };

    // create schema from fields
    const schema = Model.createSchema(fields);

    // CREATE VIRTUAL FIELDS
    const setVirtualField = (fieldName, ref, localField, foreignField) => {
        schema.virtual(fieldName, {
            ref,
            localField,
            foreignField
        });
    }

    setVirtualField('profile', 'Profile', '_id', 'user');
    setVirtualField('contact', 'Customer_Contact', '_id', 'user');

    // create schema model
    return Model.schemaModel("User", fields, schema);
})();

export default User;

// GRASP PATTERNS
/*
    1. information expert
*/