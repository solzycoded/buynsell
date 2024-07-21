import AddressService from "../services/AddressService.js";
import CityService from "../services/CityService.js";
import CountryService from "../services/CountryService.js";
import PostCodeService from "../services/PostCodeService.js";

const allAddresses = async(req, res)  => {
    try {
        const user      = req.session.user.id;
        const addresses = await AddressService.listAllAddresses(user);

        res.status(201).json({ success: true, data: addresses });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const createAddress = async(req, res)  => {
    const { countryName, cityName, postCodeName, userAddress } = req.body;

    if(!countryName || !cityName || !postCodeName || !userAddress) {
        res.status(400).json({ success: false, data: "Country, City, Postcode or Address field is missing!" });
        return;
    }

    try {
        const country  = await CountryService.createNewCountry(countryName);
        const city     = await CityService.createNewCity(country, cityName);
        const postCode = await PostCodeService.createNewPostCode(city, postCodeName);

        const user     = req.session.user.id;
        await AddressService.createNewAddress(postCode, user, userAddress);

        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

const deleteAddress = async(req, res)  => {
    const { addressId } = req.params;
    
    if(!addressId) {
        res.status(400).json({ success: false, data: "Address Id is missing!" });
        return;
    }

    try {
        await AddressService.deleteAddress(addressId);

        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(202).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const AddressController = {
    allAddresses,
    createAddress,
    deleteAddress,
}

export default AddressController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/