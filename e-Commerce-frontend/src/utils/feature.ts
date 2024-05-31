import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/apiTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction} from "react-router-dom";
import toast from "react-hot-toast";

type ResType = {
        data: MessageResponse;
        error?: undefined;
    } | {
        data?: undefined;
        error: FetchBaseQueryError | SerializedError;
};

export const responseToast = (res:ResType,navigate:NavigateFunction | null, url:string) => {
    if("data" in res){
        toast.success(res.data!.message)
        if(navigate) navigate(url);
    }
    else{
        const error = res.error as FetchBaseQueryError;
        const message  = (error.data as MessageResponse).message; 
        toast.error(message);
    }

}