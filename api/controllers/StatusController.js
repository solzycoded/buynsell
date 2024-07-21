import StatusService from "../services/StatusService.js";

const allStatus = async(req, res)  => {
    try {
        let statusList = await StatusService.getAllStatus(); // get list of status

        res.status(201).json({ success: true, data: statusList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: error.message });
    }
};

// export CONTROLLER
const StatusController = {
    allStatus
}

export default StatusController;

// GRASP PATTERNS
/* 
    1. controller
    2. high cohesion
*/