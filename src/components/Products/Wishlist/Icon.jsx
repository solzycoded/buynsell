import { useEffect, useState } from "react";
import FetchRequest from "../../../assets/js/request/fetch.js";
import { useAuth } from "../../Auth/AuthContext.jsx";
import App from "../../../assets/js/app.js";

const WishlistIcon = ({ productId }) => {
    const [inWishlist, setInWishlist]               = useState(false);
    const [wishlistIcon, setWishlistIcon]           = useState("heart");
    const [wishlistIconColor, setWishlistIconColor] = useState("save-to-wishlist");
    const { user, loading } = useAuth();

    useEffect(() => {
        if(!loading && user){
            checkIfProductInWishlist();
        }
    }, [user, loading]);

    // check if product exists and make the product display either "remove from wishlist" or "add to wishlist"
    const checkIfProductInWishlist = () => {
        const success = (data) => {
            setInWishlist(data.inWishlist);
            updateWishlistBtnDisplay(data.inWishlist);
        }

        const failure = (data) => {
            console.log("failure", data);
        }

        (new FetchRequest("GET", `wishlist/confirm/${productId}`)).send(success, failure);
    }

    // add to or remove product from wishlist
    const toggleSave = () => {
        if(!loading && !user){
            App.showAlert(false, "You can't save any item, until you Login.");
            return;
        }

        const success = (data) => {
            updateWishlistBtnDisplay(!inWishlist);
            setInWishlist(!inWishlist);

            App.showAlert(true, data);
        }

        const failure = (data) => {
            App.showAlert(false, data);
        }

        (new FetchRequest("POST", "wishlist", { productId })).send(success, failure);
    }

    // set the content of the wishlist (depending on if it's already in wishlist or if it needs to be added to one)
    const updateWishlistBtnDisplay = (productInWishlist) => {
        if(productInWishlist){
            setWishlistIcon("heart-fill");
            setWishlistIconColor("saved-to-wishlist");
        }
        else{
            setWishlistIcon("heart");
            setWishlistIconColor("save-to-wishlist");
        }
    }

    return (
        <>
            <div className="position-absolute end-0 top-0 p-2 wishlist-icon-container">
                {/* save to wishlist */}
                <button type="button" 
                    className="btn btn-transparent p-0 fs-5 save-btn"
                    onClick={toggleSave}>
                    <i className={`bi bi-${wishlistIcon} ${wishlistIconColor}`}></i>
                </button>
            </div>
        </>
    )
}

export default WishlistIcon;