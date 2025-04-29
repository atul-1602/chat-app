import User from "../models/user.model.js";

export const getusersForSideBar = async(req, res)=>{
    try{
        const loggedInUserId = req.user._id;

        const allUsers= await User.find({_id: {$ne: loggedInUserId}}).select("-password") // current user is not visibel on sidebar 

        res.status(200).json(allUsers)
    }catch(err){
        console.log("Error in getting sidebar users", err.message);
        res.statu(500).json({err: "Internal Server error"})
        
    }
}