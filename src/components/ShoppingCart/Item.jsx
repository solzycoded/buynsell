
import { useNavigate } from "react-router-dom";
import CartButton from "../Products/Cart/Item";
import WishlistIcon from "../Products/Wishlist/Icon";
import CartItemCounter from "./Counter";

const CartItem = ({ product, quantity }) => {
    const navigate = useNavigate();

    const removeItemFromCart = () => {
        // reload the page
        navigate('/');
        setTimeout(() => {
          navigate('/shopping-cart');
        }, 0);
    }

    const openProductDetails = (e) => {
        e.preventDefault();

        navigate(`/products/${product._id}/${product.name}`);
    };

    return (
        <>
            <div className="col-12 col-sm-6 cart-item mb-3">
                <div className="card cart-container">
                    <div className="row g-0">

                        <div className="col-md-5">
                            <div className="view-product position-relative">
                                <div className="cursor-pointer cart-img-container" onClick={openProductDetails}>
                                    <img src={ (product.images[0]!==undefined ? `/imgs/products/${product.images[0].image}` : "https://res.cloudinary.com/ellegacy/image/upload/v1716228810/lelskznm8pilgc53xcdd.jpg") } 
                                        className="img-fluid rounded cart-img" 
                                        alt="shopping cart item" />
                                </div>
                                <WishlistIcon productId={ product.id } />
                            </div>
                        </div>

                        {/* {{-- quantity --}} */}
                        <div className="col-md-7">
                            <div className="card-body p-3">
                                <h5 className="card-title text-capitalize cursor-pointer">{ product.name }</h5>

                                <div className="card-text mt-3">
                                    {/* quantity */}
                                    <CartItemCounter productId={ product.id } maxQuantity={ product.available_quantity } quantity={ quantity } price={ product.price } />

                                    <div className="cursor-pointer" onClick={removeItemFromCart}>
                                        <CartButton productId={ product.id } />
                                    </div>
                                </div>

                                <p className="card-text">
                                    <small className="text-danger">{ product.available_quantity } left</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem;