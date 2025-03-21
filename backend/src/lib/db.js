import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Add options to address deprecation warnings
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Check for and remove problematic indexes
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      const collectionName = collection.collectionName;
      if (collectionName === 'messages') {
        const indexes = await collection.indexes();
        for (let index of indexes) {
          if (index.key && index.key.email) {
            await collection.dropIndex("email_1");
            console.log("Dropped email index from messages collection");
          }
        }
      }
    }
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};