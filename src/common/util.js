const calculateOrderDetails = (order) => {
    let totalQuantity = 0;
    let totalPrice    = 0;

    order.customer_orders.forEach((customerOrder) => {
        let quantity  = customerOrder.quantity
        totalQuantity += quantity;
        totalPrice    += (customerOrder.price * quantity);
    });

    return { totalQuantity, totalPrice };
}

const getDate = (datetimeString = "") => {
    const today = new Date(datetimeString);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    
    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

const getTime = (datetimeString = "") => {
    // Create a new Date object from the datetime string
    var date = new Date(datetimeString);

    // Get hours, minutes, and seconds
    var hours   = date.getHours();
    var minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine AM/PM
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the time as HH:MM:SS AM/PM
    var time = `${hours}:${minutes} ${ampm}`;

    return time;
}

const App = {
    calculateOrderDetails,
    getDate,
    getTime,
}

export default App;