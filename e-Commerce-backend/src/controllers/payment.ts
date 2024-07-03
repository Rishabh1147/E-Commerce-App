import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const createPayment = TryCatch(async (req,res,next)=> {
    
    const { amount } = req.body;
    console.log(amount);

    if(!amount) return next(new ErrorHandler("Please Enter Amount", 400));

    const payment = await stripe.paymentIntents.create({
        amount:Number(amount)*100,
        currency: "inr",
    });

    return res.status(201).json({ 
        success: true,
        clientSecret: payment.client_secret,
    })
});

export const newCoupon = TryCatch(async (req,res,next)=> {
    
    const {coupon,amount} = req.body;

    if(!coupon || !amount) return next(new ErrorHandler("Please Enter both coupon and amount", 400));

    await Coupon.create({ code: coupon,amount});

    return res.status(201).json({ 
        success: true,
        message: `Coupon:" ${coupon} " Created Successfully`,
    })
});

export const givenDiscount = TryCatch(async (req,res,next)=> {
    
    const { coupon } = req.query;

    const discount = await Coupon.findOne({ code: coupon});

    if(!discount) return next(new ErrorHandler("Invalid Coupon Code", 400));



    return res.status(200).json({ 
        success: true,
        discount: discount.amount,
    });
});

export const allCoupons = TryCatch(async (req,res,next)=> {

    const coupons = await Coupon.find({});

    return res.status(200).json({ 
        success: true,
        coupons,
    });
});

export const deleteCoupon = TryCatch(async (req,res,next)=> {

    const {id} = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if(!coupon) return next(new ErrorHandler("Coupon Not Found", 404)); 

    return res.status(200).json({ 
        success: true,
        message: `Coupon ${coupon?.code} Deleted Successfully`,
    });
});