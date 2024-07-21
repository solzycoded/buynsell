import { Schema } from "mongoose";
import Model from "./model.js";

const ShoppingCart = (() => {
    const fields = {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    };

    // create schema model
    return Model.schemaModel("Shopping_Cart", fields);
})();

export default ShoppingCart;

// GRASP PATTERNS
/*
    1. information expert
*/