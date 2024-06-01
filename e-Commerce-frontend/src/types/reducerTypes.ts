import { CartItem, ShippingInfo, User } from "./types";


export interface UserReducerIninitialState {
    user: User | null;
    loading: boolean;
}

export interface CartReducerIninitialState {
    loading: boolean;
    cartItems: CartItem[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: ShippingInfo;

}