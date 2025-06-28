import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URI || process.env.MONGO_DB_URL;

        if (!mongoUrl) {
            throw new Error("MongoDB connection string is not defined in environment variables.");
        }

        // Hide credentials in logs
        const safeMongoUrl = mongoUrl.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
        console.log("🔌 Attempting to connect to MongoDB...");
        console.log("🌐 MongoDB URL:", safeMongoUrl);

        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(mongoUrl, options);
        console.log("✅ MongoDB connected successfully");

        // Connection event handlers
        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("🔄 MongoDB reconnected");
        });

        // Graceful shutdown
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("🛑 MongoDB connection closed due to application termination");
            process.exit(0);
        });

    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err.message);
        console.error("📄 Full error:", err);
        throw err;
    }
};

export default connectToMongoDB;
