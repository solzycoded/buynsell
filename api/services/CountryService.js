import Country from "../models/Country.js";

const CountryService = (() => {
    const listAllCountries = async () => {
        const countries = await Country.find().exec();

        return countries;
    }

    const createNewCountry = async (countryName) => { // create a new country, only if it does not exist and return the country's document
        let country = await findCountryByName(countryName);

        if(!country){
            country = new Country({ name: countryName });

            country.save();
        }

        return country._id;
    }

    const findCountryByName = async (countryName) => {
        return await Country.findOne({ name: countryName }).exec();
    }

    return {
        listAllCountries,
        createNewCountry,
    }

})();

export default CountryService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/