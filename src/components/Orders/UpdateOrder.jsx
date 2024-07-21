import { useEffect, useState } from "react";
import FetchRequest from "../../assets/js/request/fetch";
import AppFn from "../../assets/js/app";
import App from "../../common/util";

const UpdateSellerOrder = () => {
    const [ order, setOrder ]               = useState({});

    const [ deliveryDate, setDeliveryDate ] = useState("");
    const [ orderStatus, setOrderStatus ]   = useState("");

    // 1. processing, 2. shipped, 3. delivering, 4. delivered

    useEffect(() => {
        var myModal = document.getElementById('updateSellerOrder');
        
        myModal.addEventListener('shown.bs.modal', function () {
            getOrderDetails();
        });
    }, []);

    const orderStatusList = ["processing", "shipped", "delivering", "delivered"];

    const getOrderDetails = () => {
        const orderIdTag = document.querySelector("#orderId");

        if(order!==undefined){
            const success = (data) => {
                setOrder(data);
                
                setDeliveryDate(data.deliver_before!==undefined ? App.getDate(data.deliver_before) : "");
                setOrderStatus(data.delivery_status);
            }

            const failure = (data) => {
                setOrder(data);

                setDeliveryDate("");
                setOrderStatus("");
            }

            const orderId = orderIdTag.value;
            (new FetchRequest("GET", `orders/seller/find/${orderId}`)).send(success, failure);
        }
    }

    const updateOrder = (e) => { 
        e.preventDefault();
        
        const orderIdTag = document.querySelector("#orderId");

        if(order!==undefined){
            const success = (data) => {
                AppFn.showAlert(true, data);
            }

            const failure = (data) => {
                AppFn.showAlert(false, data);
            }

            const orderId = orderIdTag.value;
            const data    = {deliveryDate, deliveryStatus: orderStatus};

            (new FetchRequest("POST", `orders/seller/${orderId}`, data)).send(success, failure);
        }
    }

    return (
        <>
            <div className="modal fade" id="updateSellerOrder" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="updateSellerOrderLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateSellerOrderLabel">Order #{ order.tag}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={updateOrder}>
                        <div className="modal-body">
                            <input type="hidden" id="orderId" />
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="delivery-date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} placeholder="delivery date" required min={ App.getDate() } />
                                    <label htmlFor="delivery-date">Delivery date</label>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-start">
                                        {
                                            orderStatusList.map((status, i) => {
                                                return <p key={ i } className={`me-2 text-capitalize text-${ (status===order.delivery_status ? "warning" : "secondary" )}`}>{ (i + 1) + ". " + status }</p>
                                            })
                                        }
                                    </div>

                                    <div className="form-floating mb-3">
                                        <select className="form-select text-capitalize" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                                            {
                                                orderStatusList.map((status, i) => {
                                                    return <option key={ i } value={ status }>{ status }</option>
                                                })
                                            }
                                        </select>
                                        <label htmlFor="delivery-date">Order Status</label>
                                    </div>
                                </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Update Order</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateSellerOrder;