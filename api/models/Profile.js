import { Schema } from "mongoose";
import Model from "./model.js";

const Profile = (() => {
    const fields = {
        business_name: {
            type: String, 
            required: true, 
            unique: true,
            validate: {
                validator: function(value) {
                    return this.constructor.findOne({ name: value })
                        .then(existingUser => !existingUser);
                },
                message: 'Business Name already exists'
            }
        },
        user:  {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        started_on: {
            type: Number, 
            required: true,
        },
        services: {
            type: String, 
        },
        display_picture: {
            type: String,
        },
        address: {
            type: String,
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    };

    // create schema model
    return Model.schemaModel("Profile", fields);

})();

export default Profile;

// GRASP PATTERNS
/*
    1. information expert
*/