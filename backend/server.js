import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js"
import 'dotenv/config'
//app config
const app = express()
const port = process.env.PORT || 4000

//middleware

app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter);

app.use("/images",express.static('uploads'));

app.use("/api/user",userRouter);

app.use("/api/cart", cartRoute)

app.use("/api/order",orderRoute);

app.get("/", (req,res) =>{
    res.send ("API Working")
})

app.listen (port,() =>{
    console.log(`Server Started on http://localhost:${port}`)
})

//e3Nf5nvPfzYZxOkw

//mongodb+srv://dspdaya1234:e3Nf5nvPfzYZxOkw@cluster0.hpn3k.mongodb.net/?