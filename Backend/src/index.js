import { server } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 5000, ()=> {
            console.log(`server is connected at port: ${process.env.PORT || 5000}`)
        })
    })
    .catch((err) => {
        console.log(`mongoDB connection failed !!..`, err)
    })
