import jwt from "jsonwebtoken";

const generateJwtAndSetCookies = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d"
	});

	const isProduction = process.env.NODE_ENV === "production";

	const cookieOptions = {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		httpOnly: true,
		secure: isProduction,             // ✅ Send only on HTTPS
		sameSite: isProduction ? "None" : "Lax", // ✅ Needed for cross-origin
		path: "/",
	};

	res.cookie("jwt", token, cookieOptions);
};

export default generateJwtAndSetCookies;
