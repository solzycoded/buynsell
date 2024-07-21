const PaymentConfirmation = ({ success, message }) => {
    return (
        <>
            <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#paymentConfirmation" id="payment-confirmation">
            </button>

            <div className="modal fade" id="paymentConfirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="paymentConfirmationLabel" aria-hidden="true">
                {/* modal-dialog-centered */}
                <div className="modal-dialog modal-sm" id="payment-confirmation-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="paymentConfirmationLabel">Payment Confirmation</h1>
                            <button type="button" className="btn-close something" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <p className="m-0"><i className={`bi bi-${success ? "check-circle" : "exclamation-circle-fill"} text-${success ? "success" : "danger"} fs-1`}></i></p>
                                <p className={`fw-bold text-${success ? "success" : "danger"}`}>{ message }</p>
                                <p className={`fw-bolder ${success ? "" : "d-none"}`}>Creating your order...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentConfirmation;