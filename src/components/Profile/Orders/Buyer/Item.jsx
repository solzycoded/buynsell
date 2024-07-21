import { useEffect, useState } from "react";
import ProductItem from "../../../Products/Item";
import FetchRequest from "../../../../assets/js/request/fetch";
import App from "../../../../common/util";

function MyBuyerOrderItem({ order }) {
    const [ orderDetail, setOrderDetail ] = useState({});

    useEffect(() => {
        const orderDetail = App.calculateOrderDetails(order);
        setOrderDetail(orderDetail);
    }, [order]);

    if(order===null){
        return;
    }

    const cancelOrder = () => {
        const success = (data) => {
            console.log(data);
        }

        const failure = (data) => {
            order.cancelled = false;
            console.log(data);
        }

        (new FetchRequest("POST", `orders/buyer/cancel`, { orderId: order.id })).send(success, failure);
    }

    return (
        <>
            
            <div className="col-12 mb-5">
                <div className="border-bottom pb-2 border-dark position-relative">
                    <div className="pe-18 mb-2">
                        <h5 className="mb-1">Order <b>#{ order.tag }</b></h5>

                        <small className="mb-1 text-secondary">You ordered for <b className="text-dark">{ orderDetail.totalQuantity } item(s)</b> on the <b>{ App.getDate(order.created_at) }</b>.</small>

                        <h6>
                            <span className={ (order.delivered_on ? "text-success" : "d-none") }>Delivered on <b>{ App.getDate(order.delivered_on) }</b></span>
                            <span className={ (!order.cancelled && order.deliver_before ? "text-secondary" : "d-none") }>Item(s) to be delivered before <b>{ App.getDate(order.deliver_before) }</b></span>
                            <span className={ (order.cancelled ? "text-danger" : "d-none") }>Order was cancelled.</span>
                            <span className={ ((!order.cancelled && !order.deliver_before) ? "text-warning" : "d-none") }>Order has been received. <b className="fs-8">Delivery date not yet set.</b></span>
                        </h6>
                    </div>
                    <div className="position-absolute end-0 top-0 text-right">
                        <div className="mb-2">
                            {
                                (order.delivered_on!==null && !order.cancelled) && (<form onSubmit={cancelOrder}>
                                    <button type="submit" className="btn bg-danger p-1 text-white cancel-order">
                                        <i className="bi bi-x-circle"></i> Cancel order
                                    </button>
                                </form>)
                            }
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="container-fluid p-0" style={{"maxHeight": "200px", "overflowY": "auto", "overflowX": "hidden"}}>
                            <div className="row">
                                {
                                    order.customer_orders.map((customerOrder, i) => {
                                        return (
                                            <ProductItem key={ i } product={ customerOrder.product } /> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-3"><p>Amount Paid: <b>{ orderDetail.totalPrice }</b>.</p></div>
                </div>
            </div>
        </>
    );
}

export default MyBuyerOrderItem;