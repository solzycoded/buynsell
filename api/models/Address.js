import { Schema } from "mongoose";
import Model from "./model.js";

const Address = (() => {
    const fields = {
        post_code: {
            type: Schema.Types.ObjectId, 
            ref: 'Post_Code',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    };
    
    // create schema model
    return Model.schemaModel("Address", fields);
})();

export default Address;

// GRASP PATTERNS
/*
    1. information expert
*/