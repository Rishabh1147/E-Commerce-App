import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
const app = express.Router();
//Route  - /api/v1/order/new
app.post("/new", newOrder);
//Route  - /api/v1/order/my
app.get("/my", myOrders);
//Route  - /api/v1/order/my
app.get("/all", adminOnly, allOrders);
//Route  - /api/v1/order/my
app.route("/:id").
    get(getSingleOrder).
    put(adminOnly, processOrder).
    delete(adminOnly, deleteOrder);
export default app;
