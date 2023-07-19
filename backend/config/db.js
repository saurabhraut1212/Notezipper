import mongoose from "mongoose";

const connectdb = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectdb;