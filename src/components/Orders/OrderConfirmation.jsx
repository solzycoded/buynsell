const OrderConfirmation = ({ order }) => {
    const closeOrderConfirmation = () => {
        window.location.href = "/";
    }

    return (
        <>
            <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#orderConfirmation" id="order-confirmation-btn">
            </button>

            <div className="modal fade" id="orderConfirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="orderConfirmationLabel" aria-hidden="true">
                {/* modal-dialog-centered */}
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="orderConfirmationLabel">Order Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeOrderConfirmation}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <p className="m-0"><i className={`bi bi-check-circle text-success fs-1`}></i></p>
                                <p>Your order <b>{ order }</b> has been created successfully!</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeOrderConfirmation}>Go Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderConfirmation;