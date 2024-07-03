import express from "express";
import { connectDB } from './utils/feature.js';
import { errrorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import {config} from "dotenv"
import morgan from "morgan"
import Stripe from "stripe";
import cors from "cors"


//Routes
import userRoute from './routes/user.js';
import productRoute from './routes/products.js';
import orderRoute from './routes/orders.js';
import paymentRoute from './routes/payment.js';
import dashBoardRoute from './routes/stats.js';



config({
    path: "./.env",
})


const port = process.env.PORT || 3000;
// const mongoURI = process.env.MONGO_URI || "";
 const stripeKey = process.env.STRIPE_KEY || "";


connectDB();

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();


const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

app.get("/" , (req, res) => {
    res.send("api is working");
})

app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/dashboard",dashBoardRoute);




app.use("/uploads", express.static("uploads")); 
app.use(errrorMiddleware)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});