import mongoose from "mongoose";
import { trim } from "validator";


const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter Name"],
        },

        photo: {
            type: String,
            required: [true, "Please enter Photo"],
        },

        price: {
            type: Number,
            required: [true, "Please enter price"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter stock details"],
        },
        category: {
            type: String,
            required: [true, "Please enter product category"],
            trim: true,
        },

    },

    {
        timestamps: true,
    }
);



export const Product = mongoose.model("Product",schema);
