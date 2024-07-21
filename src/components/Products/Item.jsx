import { useNavigate } from "react-router-dom";
import CartButton from "./Cart/Item";
import WishlistIcon from "./Wishlist/Icon";
import { useAuth } from "../Auth/AuthContext";

function ProductItem({ product }) {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    // console.log(user.id, " : ", product.);
    if (!product) {
        return;
    }

    const openProductDetails = (e) => {
        e.preventDefault();

        navigate(`/products/${product._id}/${product.name}`);
    };

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card position-relative shadow-sm bg-body rounded border-0">
                <div className="position-relative">
                    <div className="cursor-pointer" onClick={openProductDetails}>
                        <img src={ (product.images[0]!==undefined ? `/imgs/products/${product.images[0].image}` : "https://res.cloudinary.com/ellegacy/image/upload/v1716228810/lelskznm8pilgc53xcdd.jpg") } className="card-img-top" alt="product poster" style={{"height": "200px !important"}} />
                    </div>
                    {
                        ((user && user.id!==product.seller) || !user) && (<WishlistIcon productId={ product._id } />)
                    }
                </div>
                <div className="card-body">
                    <div className="cursor-pointer mb-3" onClick={openProductDetails}>
                        <h5 className="card-title text-capitalize fs-6">{ product.name }</h5>
                        <p className="card-text">
                            £{ product.price }
                        </p>
                    </div>
                    {
                        (!user || (user && user.id!==product.seller)) && (<CartButton productId={ product._id } />)
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductItem;