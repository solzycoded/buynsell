import Address from "../models/Address.js";

const AddressService = (() => {
    const listAllAddresses = async (user) => {
        const addresses = 
            await Address.find({ user })
                .populate({
                    path: "post_code",
                    populate: {
                        path: "city",
                        populate: {
                            path: "country",
                        }
                    }
                })
                .exec();

        return addresses;
    }

    const createNewAddress = async (postCode, user, userAddress) => { // create a new address, only if it does not exist and return the address's document
        let address = await findAddress(user, postCode, userAddress);

        if(!address){
            address = new Address({ post_code: postCode, user, address: userAddress });

            address.save();
        }
    }

    const findAddress = async (user, postCode, userAddress) => {
        return await Address.findOne({ post_code: postCode, user, address: userAddress }).exec();
    }

    const deleteAddress = async (addressId) => {
        await Address.deleteOne({_id: addressId});
    }

    return {
        listAllAddresses,
        createNewAddress,
        deleteAddress,
    }

})();

export default AddressService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/