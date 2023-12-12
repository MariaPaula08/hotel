import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hotelsanjoaquin:3202472368@hotel.rsn9ric.mongodb.net/hotel')
        console.log('>>> DB is connected <<<')
    } catch (error) {
        console.log(error)
    }
}
