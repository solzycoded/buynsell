import { useState, useEffect } from "react";
import { useParams, NavLink } from 'react-router-dom';

import FetchRequest from "../assets/js/request/fetch"
import WishlistIcon from "../components/Products/Wishlist/Icon";
import CartButton from "../components/Products/Cart/Item";
import ProductImageCarousel from "../components/Products/Carousel/Section";
import { useAuth } from "../components/Auth/AuthContext";

function ProductInfo() {
    const { productId }         = useParams();
    const { productName }       = useParams();

    const [product, setProduct] = useState(null);

    const { user, loading }     = useAuth();

    useEffect(() => {
        // Function to run when the component loads
        getProductDetails();
    }, []); // Empty dependency array ensures it runs only once on mount

    if (productId === undefined || productName === undefined) {
        return;
    }

    const getProductDetails = () => {
        const success = (data) => {
            setProduct(data);
        }

        const failure = (data) => {
            setProduct(data);
        }

        (new FetchRequest("GET", `products/${productId}`)).send(success, failure);
    }

    return product && (
        <>
            <div className="shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card border-0">
                    <div className="row">
                        <div className="col-12 col-lg-5 col-md-4 col-sm-12">
                            <div className="position-relative">
                                <ProductImageCarousel images={product.images} />
                                {
                                    ((user && user.id!==product.seller) || !user) && (<WishlistIcon productId={ product._id } />)
                                }
                            </div>
                        </div>
                        <div className="col-12 col-lg-7 col-md-8 col-sm-12">
                            <div className="card-body ps-0">
                                <h5 className="card-title text-capitalize">{product.name}</h5>
                                {/* product genres */}
                                <div className="p-0 mb-3">
                                    <div className="card-text pe-0">
                                        <NavLink to={`/categories/${product.category.name}`} className="btn btn-link p-0 text-decoration-none">
                                            <span className="text-decoration-underline link-offset-2 me-2 text-capitalize">{product.category.name}</span>
                                        </NavLink>
                                    </div>
                                </div>
                                {/* product price */}
                                <div className="mt-2">
                                    <h6 className="card-title">Price</h6>
                                    <p className="card-text">£{product.price}</p>
                                </div>
                                {/* product rating */}
                                <div className="mt-2">
                                    <h6 className="card-title">Rating</h6>
                                    <p className="card-text">4.5</p>
                                </div>

                                <div className="mt-2 product-details lg-screen">
                                    <h6 className="card-title mb-2">About Product</h6>
                                    <p className="card-text">{product.details}</p>
                                </div>

                                <div className="mt-5">
                                    {
                                        ((user && user.id!==product.seller) || !user) && (<CartButton productId={ product._id } />)
                                    }
                                    <p className="text-danger mt-1">{product.available_quantity} items left</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductInfo;