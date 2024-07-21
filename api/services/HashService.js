import bcrypt from "bcrypt";

const HashService = (() => {
    // encrypt a string and call a function if successful
    const encrypt = (target, callback) => {
        bcrypt.hash(target, 10, (err, encryptedTarget) => {
            callback(err, encryptedTarget);
        });
    }

    const decrypt = async (target, compareStr) => {
        const match = await bcrypt.compare(target, compareStr);

        return match;
    }

    return {
        encrypt,
        decrypt,
    }
})();

export default HashService;

// GRASP PATTERNS
/*
    1. pure fabrication *
        : responsibility (encrypt or decrypt the provided string)
    2. high cohesion
    3. low coupling
*/