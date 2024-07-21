import Profile from "../models/Profile.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const ProfileService = (() => {
    const findUserProfile = async (userId) => {
        const profile = await Profile.findOne({ user: userId }).exec();

        return profile;
    }

    const confirmPassword = async (userId, password, res) => {
        const user = await User.findOne({ _id: userId }).exec();

        bcrypt.compare(password, user.password, (err, result) => {
            if(result) {
                res.status(201).json({ success: true, data: "Your password was verified successfully!" });
                return;
            }

            res.status(200).json({ success: false, data: { message: "The password you provided is not correct!" } });
            return;
        });
    }

    const updateProfile = async (user, businessName, address, startedOn, services, imageFile) => {
        const profile = await Profile.findOne({ user }).exec();
        const data    = { 
            business_name: businessName, 
            address, 
            started_on: startedOn, 
            display_picture: imageFile ? imageFile.filename : null, 
            user, 
            services
        };

        if(profile){
            await Profile.findByIdAndUpdate(profile._id, data, { new: true }).exec();
        }
        else{
            let profile = new Profile(data);

            profile.save();
        }
    }

    return {
        findUserProfile,
        confirmPassword,
        updateProfile,
    }

})();

export default ProfileService;