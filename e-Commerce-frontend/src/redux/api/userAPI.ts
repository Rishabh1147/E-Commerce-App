import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UserResponse } from "../../types/apiTypes";
import { User } from "../../types/types";
import axios from "axios";


export const userAPI = createApi({
    reducerPath: "userAPI", 
    baseQuery: fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse,User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            })
        }),
     }),
});

export const getUser = async(id:string) => {
    try {
        const {data}:{data: UserResponse} = await axios.get(
                `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
            );
            
        return data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const { useLoginMutation } = userAPI;





