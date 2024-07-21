import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

// views
import Layout from "../pages/Layout.jsx";
import NoPage from "../pages/NoPage.jsx";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

import Products from "../pages/admin/Products.jsx";

import Home from "../pages/Home.jsx";
import ProductInfo from "../pages/ProductInfo.jsx";
import SellAProduct from "../pages/SellAProduct.jsx";
import ShoppingCart from "../pages/ShoppingCart.jsx";
import Checkout from "../pages/Checkout.jsx";
import StripePayment from "../pages/StripePayment.jsx";
import Profile from "../pages/Profile.jsx";
import EditAProduct from "../pages/EditAProduct.jsx";
import BusinessInfo from "../pages/profile/BusinessInfo.jsx";

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* for customers */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    {/* account */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* product details */}
                    <Route path="products/:productId/:productName" element={<ProductInfo />} />
                    <Route path="sell-your-product" element={<ProtectedRoute element={<SellAProduct />} />} />
                    <Route path="sell-your-product/edit/:productId/:name" element={<ProtectedRoute element={<EditAProduct />} />} />

                    {/* shopping cart and checkout */}
                    <Route path="shopping-cart" element={<ProtectedRoute element={<ShoppingCart />} />} />
                    <Route path="checkout" element={<ProtectedRoute element={<Checkout />} />} />
                    <Route path="checkout/stripe-payment" element={<ProtectedRoute element={<StripePayment />} />} />

                    {/* profile */}
                    <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="profile/business-info" element={<ProtectedRoute element={<BusinessInfo />} />} />

                    {/* no page */}
                    <Route path="*" element={<NoPage />} />
                </Route>

                {/* for admin */}
                <Route path="/dashboard/" element={<ProtectedRoute element={<Layout />} isAdmin={true} />}>
                    {/* product */}
                    <Route path="products" element={<Products />} />

                    {/* no page */}
                    <Route path="*" element={<NoPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes;