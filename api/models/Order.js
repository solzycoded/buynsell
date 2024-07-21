import { Schema } from "mongoose";
import Model from "./model.js";

const Order = (() => {
    const fields = {
        user:  {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        deliver_before: {
            type: Date,
        },
        delivered_on: {
            type: Date,
        },
        tag: {
            type: String,
            required: true,
            default: ("BNS-" + Math.random().toString(36))
        },
        delivery_status: {
            type: String,
            required: true,
            default: "processing"
        },
        payment_id: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        cancelled: {
            type: Boolean,
            default: false
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

    setVirtualField('customer_orders', 'Customer_Order', '_id', 'order');

    // create schema model
    return Model.schemaModel("Order", fields, schema);
})();

export default Order;

// GRASP PATTERNS
/*
    1. information expert
*/