import { Schema } from "mongoose";
import Model from "./model.js";

const CustomerContact = (() => {
    const fields = {
        phone: {
            type: String,
            required: true,
            length: 11,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        email: {
            type: String,
        },
        created_at: {
            type: Date,
            default: Date.now,
        }
    };

    // create schema model
    return Model.schemaModel("Customer_Contact", fields);
})();

export default CustomerContact;

// GRASP PATTERNS
/*
    1. information expert
*/