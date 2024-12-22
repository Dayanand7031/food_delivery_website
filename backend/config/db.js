import mongoose from "mongoose";

 export const connectDB = async() =>{
    try {
        // Replace with your MongoDB connection string or IP address
        const uri = 'mongodb://localhost:27017/food-del';
    
        // Attempting to connect to MongoDB
        await mongoose.connect(uri);
        console.log('Connected to MongoDB successfully');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
}