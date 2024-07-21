import { Schema } from "mongoose";
import Model from "./model.js";

const CustomerOrder = (() => {
    const fields = {
        order:  {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    };

    // create schema model
    return Model.schemaModel("Customer_Order", fields);
})();

export default CustomerOrder;

// GRASP PATTERNS
/*
    1. information expert
*/