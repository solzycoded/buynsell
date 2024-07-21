const CheckoutCartItem = ({ product, quantity }) => {

    return (
        <>
            <div className="col cart-item mb-3">
                <div className="card cart-container">
                    <div className="row g-0">

                        <div className="col-md-5">
                            <div className="position-relative">
                                <img src={ (product.images[0]!==undefined ? `/imgs/products/${product.images[0].image}` : "https://res.cloudinary.com/ellegacy/image/upload/v1716228810/lelskznm8pilgc53xcdd.jpg") } 
                                    className="img-fluid rounded-start" 
                                    alt="shopping cart item" style={{"maxHeight": "200px !important", "height": "inherit"}} />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="card-body p-2">
                                <h6 className="card-title text-capitalize">{ product.name }</h6>

                                <div className="card-text mt-3">
                                    <p className="m-0">Quantity: {quantity}</p>
                                    <p className="m-0">Price: £{product.price}</p>
                                    <p className="mt-0">Total: £{quantity * product.price}</p>
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

export default CheckoutCartItem;