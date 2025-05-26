import mongoose from "mongoose";

const connectDB = async () => {
try {
    mongoose.connection.on('connected', () => {
            console.log('DB CONNECTED');
            
    })
    await mongoose.connect(`${process.env.MONGO_URL }/greencart`)
    
} catch (error) {
    console.log(error.message);
    
}

}
export default connectDB