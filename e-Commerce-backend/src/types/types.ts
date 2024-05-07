import { NextFunction, Request, Response } from "express";

export interface NewUserReqeustBody{
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
}

export interface NewProductReqeustBody{
    name: string;
    category: string;
    price: number;
    stock: number;
}


export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>


export type SearchReqeustQuery = {
    search?: string;
    price?: string
    category?: string;
    sort?: string;
    page?:string;


}

export interface BaseQuery{
    name?:{
        $regex: string,
        $options: string,
    };
    price?:{
        $lte: number,
    };
    category?: string;
}

export type InvalidateCacheProps = {
    product ?: boolean;
    order?: boolean;
    admin?: boolean;


}