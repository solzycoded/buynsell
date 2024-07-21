import CustomerContact from "../models/CustomerContact.js";

const CustomerContactService = (() => {
    const createNewCustomerContact = async (email, phone, user) => { // create a new customerContact, only if it does not exist and return the customerContact's document
        let customerContact = await findCustomerContact(user);

        if(!customerContact){
            customerContact = new CustomerContact({ phone, user, email });

            customerContact.save();
        }
        else{
            customerContact = await CustomerContact.findByIdAndUpdate(customerContact.id, { phone, email }, { new: true }).exec();
        }
    }

    const findCustomerContact = async (user) => {
        return await CustomerContact.findOne({ user }).exec();
    }

    return {
        createNewCustomerContact,
        findCustomerContact,
    }

})();

export default CustomerContactService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/