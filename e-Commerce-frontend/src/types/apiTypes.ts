import { BarStats, CartItem, LineStats, Order, PieStats, Product,ShippingInfo,Stats,User } from "./types";

export type CustomError = {
    status:number;
    data:{
        message:string,
        success: boolean;
    }
}

export type MessageResponse = {
    success: boolean;
    message: string;
};

export type AllUserResponse = {
    success: boolean;
    users: User[];
};

export type UserResponse = {
    success: boolean;
    user: User;
};

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
};

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
};

export type SearchProductsResponse = {
    success: boolean;
    products: Product[];
    totalPage: number;
};
export type ProductsResponse = {
    success: boolean;
    product: Product;
};
export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
};
export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
}; 

export type StatsResponse = {
    success: boolean;
    stats: Stats;
}; 

export type PieResponse = {
    success: boolean;
    charts: PieStats;
}; 

export type BarResponse = {
    success: boolean;
    charts: BarStats;
}; 

export type LineResponse = {
    success: boolean;
    charts: LineStats;
}; 

export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
};

export type NewProductRequest = {
    id:string;
    formData: FormData;

};
export type UpdateProductRequest = {
    userID: string;
    productId: string;
    formData: FormData;
};

export type DeleteProductRequest = {
    userID: string;
    productId: string;
};

export type NewOrderRequest = {
    shippingInfo: ShippingInfo; 
    orderItems: CartItem[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
};
export type UpdateOrderRequest = {
    userID: string;
    orderID: string;
};
export type DeleteUserRequest = {
    userID: string;
    adminUserID: string;
};

