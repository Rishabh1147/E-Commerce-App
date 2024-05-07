import { error } from "console";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";



export const errrorMiddleware = (
    err:ErrorHandler,
    req:Request,
    res:Response,
    next:NextFunction) =>{

        err.message ||= "";
        err.statusCode ||= 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}


export const TryCatch = 
(func:ControllerType) =>
    (req:Request,res:Response,next:NextFunction) => {
     return Promise.resolve(func(req,res,next)).catch(next);
    };