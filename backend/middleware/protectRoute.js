import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ error: "Unauthorised access" });
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) return res.status(401).json({ error: "Unauthorized token" })

        const user = await User.findById(decode.userId).select("-password")
        if (!user) return res.status(401).json({ message: "User not found" })

        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protectedRoute middleware: ", err.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export default protectRoute