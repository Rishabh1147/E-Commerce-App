import { Product, User } from "./types";

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

export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
};

export type ProductsResponse = {
    success: boolean;
    product: Product;
};

export type NewProductRequest = {
    id:string;
    formData: FormData;

};
export type UpdateProductRequest = {
    userID: string;
    productID: string;
    formData: FormData;
};

export type DeleteProductRequest = {
    userID: string;
    productID: string;
};