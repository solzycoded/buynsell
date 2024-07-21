import { Schema } from "mongoose";
import Model from "./model.js";

const Product = (() => {
    const fields = {
        name: {
            type: String,
            required: true,
        },
        available_quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId, 
            ref: 'Category',
            required: true,
        },
        seller: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
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

    setVirtualField('images', 'Product_Image', '_id', 'product');
    setVirtualField('product_status', 'Product_Status', '_id', 'product');

    // create schema model
    return Model.schemaModel("Product", fields, schema);
})();

export default Product;

// GRASP PATTERNS
/*
    1. information expert
*/