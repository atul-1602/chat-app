import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJwtAndSetCookies from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword)
            return res.status(400).json({ error: "Password don't match" })
        const user = await User.findOne({ userName });
        if (user)
            return res.status(400).json({ error: "User already exist" })

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            generateJwtAndSetCookies(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Invalid Data" })
        }
    } catch (err) {
        console.log("error in signup controller", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const existingUser = await User.findOne({ userName });

        if (!existingUser) {
            return res.status(400).json({ error: "Incorrect username or password" });
        }

        const isPassword = await bcrypt.compare(password, existingUser.password);

        if (!isPassword) {
            return res.status(400).json({ error: "Incorrect username or password" });
        }

        generateJwtAndSetCookies(existingUser._id, res)
        res.status(201).json({
            _id: existingUser._id,
            fullName: existingUser.fullName,
            userName: existingUser.userName,
            profilePic: existingUser.profilePic
        })
    } catch (err) {
        console.log("Error in signup controller", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout successfully" })
    } catch (err) {
        console.log("Error in logout controller", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}