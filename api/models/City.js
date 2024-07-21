import { Schema } from "mongoose";
import Model from "./model.js";

const City = (() => {
    const fields = {
        country:  {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    };

    // create schema model
    return Model.schemaModel("City", fields);
})();

export default City;

// GRASP PATTERNS
/*
    1. information expert
*/