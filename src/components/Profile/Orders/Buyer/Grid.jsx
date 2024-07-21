import { useEffect, useState } from "react";
import MyBuyerOrderItem from "./Item";
import FetchRequest from "../../../../assets/js/request/fetch";

function MyBuyerOrderItemGrid() { 
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        getUserOrders();
    }, []);

    const getUserOrders = () => {
        const success = (data) => {
            setOrders(data);
        }

        const failure = (data) => {
            setOrders(data);
        }

        (new FetchRequest("GET", `orders/buyer`)).send(success, failure);
    }

    return (
        <>
            {
                orders.map((order, i) => {
                    return <MyBuyerOrderItem key={ i } order={ order } />
                })
            }
            {
                (orders.length===0) && (
                    <div>You have not placed any orders.</div>
                )
            }
        </>
    );
}

export default MyBuyerOrderItemGrid;