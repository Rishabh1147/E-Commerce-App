import exp from "constants";
import  express  from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { allCoupons,createPayment,deleteCoupon,givenDiscount, newCoupon } from "../controllers/payment.js";

const app = express.Router();

//Route  - /api/v1/payment/create
app.post("/create",createPayment);

//Route  - /api/v1/payment/discount
app.get("/discount", givenDiscount);

//Route  - /api/v1/payment/coupon/new
app.post("/coupon/new",adminOnly, newCoupon);

//Route  - /api/v1/payment/coupon/all
app.get("/coupon/all",adminOnly, allCoupons);

//Route  - /api/v1/payment/coupon/:id
app.delete("/coupon/:id",adminOnly, deleteCoupon);


export default app;
