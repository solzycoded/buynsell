import { Schema } from "mongoose";
import Model from "./model.js";

const ProductImage = (() => {
    const fields = {
        product:  {
            type: Schema.Types.ObjectId,  
            ref: 'Product',
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    };

    // create schema model
    return Model.schemaModel("Product_Image", fields);
})();

export default ProductImage;

// GRASP PATTERNS
/*
    1. information expert
*/