import City from "../models/City.js";

const CityService = (() => {
    const listAllCities = async () => {
        const cities = await City.find().exec();

        return cities;
    }

    const createNewCity = async (country, cityName) => { // create a new city, only if it does not exist and return the city's document
        let city = await findCityByName(country, cityName);

        if(!city){
            city = new City({ name: cityName, country });

            city.save();
        }

        return city._id;
    }

    const findCityByName = async (country, cityName) => {
        return await City.findOne({ name: cityName, country }).exec();
    }

    return {
        listAllCities,
        createNewCity,
    }

})();

export default CityService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection??
*/