const CartItemTotal = ({ price, quantity}) => {
    return (
        <>

            <div className="card-text mb-3 mt-2">
                {/* price * quantity */}
                <small className="text-muted">
                    <span className="product-price">£{price}</span> x {quantity}
                </small>
                {/* total */}
                <p className="card-text m-0">£{ price * quantity }</p>
            </div>

        </>
    )
}

export default CartItemTotal;