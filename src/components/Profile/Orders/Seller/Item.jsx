import { useEffect, useState } from "react";
import MyProductItem from "../../Products/Item";
import App from "../../../../common/util.js";
import ProductItem from "../../../Products/Item.jsx";

function MySellerOrderItem({ order }) {
    const [ orderDetail, setOrderDetail ] = useState({});

    useEffect(() => {
        const orderDetail = App.calculateOrderDetails(order);
        setOrderDetail(orderDetail);
    }, [order]);

    if(!order){
        return;
    }

    const openUpdateSellerModal = () => {
        const orderIdTag = document.querySelector("#orderId");

        orderIdTag.value = order._id;
    }

    return (
        <>

            <div className="col-12 mb-5">
                <div className="border-bottom pb-2 border-dark position-relative">
                    <div className="pe-18">
                        <h5 className="mb-1">
                            Order <b>#{ order.tag }</b>
                            {
                                !order.cancelled && (<button className="btn btn-transparent text-danger ms-3 p-0" data-bs-toggle="modal" data-bs-target="#updateSellerOrder" onClick={openUpdateSellerModal}>UPDATE</button>)
                            }
                        </h5>

                        <small className="mb-1 text-secondary">
                            <span className="text-primary">{ (order.user.profile.length > 0) ? order.user.profile[0].business_name : order.user.name }</span> ordered for <b className="text-dark">{ orderDetail.totalQuantity } item(s)</b> on the <b>{ App.getDate(order.created_at) } at { App.getTime(order.created_at) }</b>.
                        </small>
                        
                        <h6 className={`mt-3 ${(order.cancelled ? "d-none" : "")}`}>
                            <span className={(order.deliver_before ? "" : "d-none")}>You set delivery date to { App.getDate(order.deliver_before) }</span>

                            <div className={(order.deliver_before ? "d-none" : "fw-bold")}>
                                <span>You've not set a delivery date.</span>
                                <small className="text-secondary ms-2">(you're advised to set a date, within 24 hours of getting order)</small>
                            </div>

                            <span className={(order.delivered_on ? "" : "d-none")}>Order was delivered on { order.delivered_on }</span>
                        </h6>
                        <h6 className={(order.cancelled ? "text-danger" : "d-none")}>
                            Order was cancelled
                        </h6>
                        <div className="mt-3">
                            <h6>Delivery Details</h6>
                            <div>
                                <p className="m-0"><b>Address: </b><span>{ `${order.address.address} ${order.address.post_code.code}, ${order.address.post_code.city.name}, ${order.address.post_code.city.country.name}` }</span></p>
                            </div>
                            <div>
                                <p><b>Phone Number: </b> <a href={ `tel:${order.user.contact[0].phone}` }>{ order.user.contact[0].phone }</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="container-fluid p-0" style={{"maxHeight": "200px", "overflowY": "auto", "overflowX": "hidden"}}>
                            <div className="row">
                                {
                                    order.customer_orders.map((customerOrder, i) => {
                                        return <ProductItem key={ i } product={ customerOrder.product } />
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-2"><p>Amount Paid: <b>${ orderDetail.totalPrice }</b>.</p></div>
                </div>
            </div>
        </>
    );
}

export default MySellerOrderItem;