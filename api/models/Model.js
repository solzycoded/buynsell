import mongoose from "mongoose";

export default class Model {
    static createSchema(fields){
        const modelSchema = new mongoose.Schema(fields, 
            {
                toJSON: { virtuals: true },
            }
        );

        return modelSchema;
    }

    static schemaModel(modelName, fields, schema = null){
        schema = schema==null ? Model.createSchema(fields) : schema;

        return mongoose.model(modelName, schema);
    }
}

// GRASP PATTERN
/* 1. pure fabrication (class PURPOSE: create a MONGOOSE schema and return it's model based on the fields provided)
   2. high cohesion
   3. low coupling
   4. indirection (reduces direct coupling between mongoose and any model class)
*/