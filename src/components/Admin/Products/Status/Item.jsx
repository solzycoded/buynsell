import { useState } from "react";
import FetchRequest from "../../../../assets/js/request/fetch";
import App from "../../../../assets/js/app";
import { useNavigate } from "react-router-dom";

const ProductStatusItem = ({ productId, status, title, color }) => {
    const [reason, setReason] = useState("");
    const navigate = useNavigate();
    const statusTag           = title==="reject" ? "rejection" : "disabling";

    const initiateProductStatusUpdate = (e) => {
        e.preventDefault();

        if(title==="approve"){
            updateProductStatus(e);
            return;
        }

        const reasons = document.querySelectorAll(".reason");
        reasons.forEach(element => {
            element.classList.add("d-none");
        });

        document.querySelector(`#${title}-status-reason`).classList.remove("d-none");
    }

    const updateProductStatus = (e) => {
        e.preventDefault();
        
        const success = (data) => {
            App.showAlert(true, "product status was successfully updated!");
        }

        const failure = (data) => {
            App.showAlert(false, "product status was not successfully updated!");
            console.log(data);
        }

        const data = {product: productId, status: title, reason};
        (new FetchRequest("POST", "product-status", data)).send(success, failure);
    }

    return (
        <>
            <div className="mb-2">
                <form onSubmit={initiateProductStatusUpdate}>
                    <div>
                        <button type="submit" className={`btn btn-${color} fw-bold text-capitalize text-white`}>{ title }</button>
                    </div>
                </form>

                <form onSubmit={updateProductStatus} className={`mt-2 ${(title==="approve" ? "d-none" : "")}`}>
                    <div id={`${title}-status-reason`} className="reason d-none">
                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="form-control" placeholder={`what's the reason for ${statusTag}?`} rows="4" cols="20" />

                        <div className="text-end mt-1">
                            <button type="submit" className={`btn btn-${color} fw-bold text-capitalize text-white update-product-status-btn`}>Finish</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProductStatusItem;