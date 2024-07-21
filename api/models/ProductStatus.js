import { Schema } from "mongoose";
import Model from "./model.js";

const ProductStatus = (() => {
    const fields = {
        status: {
            type: Schema.Types.ObjectId,
            ref: 'Status',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        reason: {
            type: String,
            required: false,
        },
        updated_at: {
            type: Date,
            default: Date.now,
            required: true
        },
    };

    // create schema model
    return Model.schemaModel("Product_Status", fields);
})();

export default ProductStatus;

// GRASP PATTERNS
/*
    1. information expert
*/