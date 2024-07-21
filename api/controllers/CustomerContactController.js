import CustomerContactService from "../services/CustomerContactService.js";

const findCustomerContact = async(req, res)  => {
    try {
        const user            = req.session.user.id;
        const customerContact = await CustomerContactService.findCustomerContact(user);

        res.status(201).json({ success: (customerContact ? true : false), data: customerContact });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const CustomerContactController = {
    findCustomerContact,
}

export default CustomerContactController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/