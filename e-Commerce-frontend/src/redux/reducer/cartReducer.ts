import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerIninitialState } from "../../types/reducerTypes";
import { CartItem } from "../../types/types";

const initialState: CartReducerIninitialState = {
    loading: false,
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total:0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    }
};

export const cartReducer = createSlice({
    name:"cartReducer",
    initialState,
    reducers:{

        addToCart:(state,action: PayloadAction<CartItem>)=>{
            state.loading = true;
            const index = state.cartItems.findIndex(i => i.productId === action.payload.productId);

            if(index !== -1){
                state.cartItems[index] = action.payload;
            } 
            else{
                state.cartItems.push(action.payload);
            }

            state.loading = false;

        },

        removeFromCart:(state,action: PayloadAction<string>) =>{
            state.loading = true;
            state.cartItems = state.cartItems.filter((i)=> i.productId !== action.payload);
            state.loading = false;
        },

        calculatePrice:(state) => {
            const  subTotal = state.cartItems.reduce(
                (total,item) => total + (item.price*item.quantity),0
            );

            state.subTotal = subTotal;
            state.tax = Math.round(subTotal * 0.18);
            state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
            state.total = state.subTotal+state.shippingCharges+state.tax - state.discount;
        },
        discountApplied:(state,action: PayloadAction<number>) =>{
            state.discount = action.payload;

        },
    },
});

export const {addToCart,removeFromCart, calculatePrice,discountApplied} = cartReducer.actions;