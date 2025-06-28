import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URI || process.env.MONGO_DB_URL;
        
        if (!mongoUrl) {
            throw new Error('MONGODB_URI environment variable is not set');
        }

        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URL:', mongoUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs

        const options = {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        };

        await mongoose.connect(mongoUrl, options);
        console.log("✅ Connected to MongoDB successfully");
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
        
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        console.error("Full error:", err);
        throw err; // Re-throw to let the calling function handle it
    }
}

export default connectToMongoDB;