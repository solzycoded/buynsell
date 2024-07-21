import Status from "../models/Status.js";
import data from "../util/data.js";

const StatusService = (() => {
    /* create default list of status */
    const createDefaultStatus = async () => {
        Status.insertMany(data.status)
            .then((docs) => {
                console.log('Multiple status inserted');
            })
            .catch((err) => {
                // console.error('Error inserting records: ', err);
            });
    }
    createDefaultStatus();

    const getAllStatus = async () => {
        return await Status.find().exec();
    }

    const findStatusByName = async (name) => {
        return await Status.findOne({ name }).exec();
    }

    return {
        getAllStatus,
        findStatusByName,
    }

})();

export default StatusService;

// GRASP PATTERNS
/*
    1. pure fabrication
    2. high cohesion
    3. low coupling
    4. indirection
*/