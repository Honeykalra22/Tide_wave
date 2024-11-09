import mongoose from 'mongoose'
import { DB_NAME } from '../constent.js'

const connectDB = async() => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongo DB connected successfully: ${response.connection.host}`)

    } catch (error) {
        console.log('mongo db is not connected!!!!...........', error)
    }
}

export default connectDB;