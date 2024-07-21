import { Schema } from "mongoose";
import Model from "./model.js";

const Wishlist = (() => {
    const fields = {
        product:  {
            type: Schema.Types.ObjectId, 
            ref: 'Product',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    };

    // create schema model
    return Model.schemaModel("Wishlist", fields);
})();

export default Wishlist;

// GRASP PATTERNS
/*
    1. information expert
*/