import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";


export const connectDB = () =>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName: "Ecom_24"
    }).then((c)=> console.log(`DB connected to ${c.connection.host}`)).
    catch((e) => console.log(e));
}

export const invalidateCache = async ({
    product,
    order,
    admin,
    userId,
    orderId,
    productId,
}: InvalidateCacheProps) => {


    if(product){
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "all-products",
            
        ];

        if(typeof productId  === "string") 
            productKeys.push(`product-${productId}`);
        
        if(typeof productId === "object") 
            productId.forEach((i) => productKeys.push(`product-${i}`));
        
        
        myCache.del(productKeys);
    }
    if(order){
        const ordersKeys: string[] = [
            "all-Orders",
            `my-orders-${userId}`,  
            `order-${orderId}`,
        ];
        myCache.del(ordersKeys);

    }
    if(admin){

    }
};

export const reduceStock = async (orderItems: OrderItemType[]) =>{

    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product) throw new Error("Product not found");

        product.stock -= order.quantity;
        await product.save();
        
    }
}

export const calculatePercentage = (thisMonth : number, lastMonth : number) => {

    if(lastMonth === 0) return thisMonth * 100; 

    const percent = ((thisMonth - lastMonth)/ lastMonth)*100;

    return Number(percent.toFixed(0));

}
export const getInventories = async ({categories, productsCount}:{categories:string[]; productsCount:number }) =>{

    const categoriesCountPromise = categories.map((category) => Product.countDocuments({category}));
        
    const categoriesCount = await Promise.all(categoriesCountPromise);

    const categoryCount: Record< string, number>[]= [];

    categories.forEach((category,i) => {
     categoryCount.push({
         [category]: Math.round((categoriesCount[i]/productsCount) * 100),
     });
    });

    return categoryCount;
}