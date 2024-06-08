import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { AllUserResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/apiTypes";
import { User } from "../../types/types";


export const userAPI = createApi({
    reducerPath: "userAPI", 
    baseQuery: fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse,User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            invalidatesTags:["users"],   
        }),
        deleteUser: builder.mutation<MessageResponse,DeleteUserRequest>({
            query: ({userID,adminUserID}) => ({
                url: `${userID}?id=${adminUserID}`,
                method: "DELETE",
            }),
            invalidatesTags:["users"],   
        }),
        allUser: builder.query<AllUserResponse, string>({
            query:id=>`all?id=${id}`,
            providesTags:["users"],
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
export const { useLoginMutation, useAllUserQuery,useDeleteUserMutation } = userAPI;





