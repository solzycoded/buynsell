import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import session from "express-session"
import { v4 } from "uuid"

import env from "./api/util/env.js";

import connectDb from "./api/database.js";

// routes
import registerRoutes from "./api/routes/RegisterRoutes.js";
import loginRoutes from "./api/routes/LoginRoutes.js";
import productRoutes from "./api/routes/ProductRoutes.js";
import categoryRoutes from "./api/routes/CategoryRoutes.js";
import productStatusRoutes from "./api/routes/ProductStatusRoutes.js";
import statusRoutes from "./api/routes/StatusRoutes.js";
import shoppingCartRoutes from "./api/routes/ShoppingCartRoutes.js";
import wishlistRoutes from "./api/routes/WishlistRoutes.js";
import productImageRoutes from "./api/routes/ProductImageRoutes.js";
import addressRoutes from "./api/routes/AddressRoutes.js";
import customerContactRoutes from "./api/routes/CustomerContactRoutes.js"
import orderRoutes from "./api/routes/OrderRoutes.js"
import sessionRoutes from "./api/routes/SessionRoutes.js"
import profileRoutes from "./api/routes/ProfileRoutes.js"
import userProductRoutes from "./api/routes/UserProductRoutes.js"

// INITIALIZE AND START APP INSTANCEa
const app  = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public')); // Serve static files from the public directory

/* session middleware configuration */
app.use(
    session({ 
        // name:'SessionCookie',
        genid: function(req) {
            console.log('session id created');
            return v4();
        },
        secret: env.session.secret,
        resave: false, // Prevents saving session if unmodified
        saveUninitialized: true, // Save new but unmodified sessions
        cookie: { 
            secure: false, 
            // expires:200000,
            maxAge: (1000 * 60 * 60 * 24),
        }
    })
);

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3001', 
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// connect the database
connectDb();

// Start the server
const PORT = env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

/* ROUTES */
// register routes
app.use('/register', registerRoutes.router);

// login routes
app.use('/login', loginRoutes.router);

// product routes
app.use('/products', productRoutes.router);

// category routes
app.use('/categories', categoryRoutes.router);

// product status routes
app.use('/product-status', productStatusRoutes.router);

// status routes
app.use('/status', statusRoutes.router);

// shopping cart routes
app.use('/shopping-cart', shoppingCartRoutes.router);

// wishlist routes
app.use('/wishlist', wishlistRoutes.router);

// product image routes
app.use('/product-images', productImageRoutes.router);

// address routes
app.use('/addresses', addressRoutes.router);

// customer contact routes
app.use('/customer-contacts', customerContactRoutes.router);

// order routes
app.use('/orders', orderRoutes.router);

// session routes
app.use('/session', sessionRoutes.router);

// profile routes
app.use('/profile', profileRoutes.router);

// user product routes
app.use('/user-products', userProductRoutes.router);

// GRASP patterns
/*
    1. pure fabrication *
    2. high cohesion
    3. low coupling *
    4. indirection??
*/