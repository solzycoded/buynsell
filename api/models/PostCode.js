import { Schema } from "mongoose";
import Model from "./model.js";

const PostCode = (() => {
    const fields = {
        city:  {
            type: Schema.Types.ObjectId, 
            ref: 'City',
            required: true,
        },
        code: {
            type: String,
            required: true,
        }
    };

    // create schema model
    return Model.schemaModel("Post_Code", fields);
})();

export default PostCode;

// GRASP PATTERNS
/*
    1. information expert
*/