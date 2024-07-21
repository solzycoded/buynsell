import mongoose from "mongoose";
import env from "./util/env.js";

// Connect to MongoDB
const connectDb = () => {
    mongoose.connect((env.database.connection_string + env.database.name))
        .then(() => {
            console.log('Connected to MongoDB');
            
        })
        .catch(err => console.error('Error connecting to MongoDB:', err));
}

export default connectDb;
// GRASP PATTERNS
/* 
    1. low coupling
    2. high cohesion
*/