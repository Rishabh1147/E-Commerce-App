import express from "express";
import { connectDB } from './utils/feature.js';
import { errrorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
//Routes
import userRoute from './routes/user.js';
import productRoute from './routes/products.js';
const port = 3000;
connectDB();
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("api is working");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));
app.use(errrorMiddleware);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
