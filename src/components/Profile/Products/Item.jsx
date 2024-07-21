import { NavLink, useNavigate } from "react-router-dom";
import FetchRequest from "../../../assets/js/request/fetch";
import App from "../../../assets/js/app";

function MyProductItem({ product }) {
    const navigate = useNavigate();
    const productStatus = product.product_status ? product.product_status[0].status.name : "PENDING"

    if (!product) {
        return;
    }

    const openProductDetails = () => {
        navigate(`/products/${product._id}/${product.name}`);
    };

    const deleteItem = (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("This product will now be permanently deleted");

        if(confirmDelete){
            const success = (data) => {
                console.log(data);
                // reload page
                navigate("/");
                setTimeout(() => {
                    navigate("/profile");
                }, 0);

                App.showAlert(true, data);
            }

            const failure = (data) => {
                App.showAlert(false, data);
            }

            (new FetchRequest("DELETE", "user-products", { productId: product.id })).send(success, failure);
        }
    }

    const setStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "success";
            case "disabled":
                return "secondary";
            case "rejected":
                return "danger";
            default:
                return "warning";
        }
    }

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card position-relative shadow-sm bg-body rounded border-0">
                <div className="position-relative">
                    <div>
                        <div className="position-absolute start-0 top-0 p-2">
                            <p className={`text-white text-uppercase bg-${setStatusColor(productStatus)} p-1`}>{ productStatus }</p>
                        </div>
                        <div className="cursor-pointer" onClick={openProductDetails}>
                            <img src={ (product.images[0]!==undefined ? `/imgs/products/${product.images[0].image}` : "https://res.cloudinary.com/ellegacy/image/upload/v1716228810/lelskznm8pilgc53xcdd.jpg") } className="card-img-top" alt="product poster" style={{"height": "200px"}} />
                        </div>
                        <div className="position-absolute end-0 top-0 p-2" style={{"zIndex": "99"}}>
                            <NavLink className="btn btn-secondary mb-1 p-1" 
                                to={`/sell-your-product/edit/${product._id}/${product.name}`}>
                                <i className="bi bi-pencil"></i>
                            </NavLink>
                            <form onSubmit={deleteItem}>
                                <button type="submit" className="btn btn-danger p-1"><i className="bi bi-trash"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-body cursor-pointer mb-3" onClick={openProductDetails}>
                    <h5 className="card-title text-capitalize fs-6">{ product.name }</h5>
                    <p className="card-text">
                        £{ product.price }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MyProductItem;