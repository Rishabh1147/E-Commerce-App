export type User= {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}

export type Product =  {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}
export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

export type OrderItem = Omit<CartItem,"stock"> & {_id: string};

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status:string;
    _id:string;
    user:{
        name:string;
        _id:string;
    }
};

type CountandChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
};

type LatestTransactions = {
    _id:string;
    amount: number;
    discount: number;
    quantity: number;
    status: string;
}

export type Stats = {
    categoryCount: Record<string,number>[];
    changePercent:CountandChange;
    count:CountandChange;
    chart:{
     order: number[];
     revenue: number[];
    },
    userRatio: { 
        male: number;
        female: number;
    },
    latestTransactions:LatestTransactions[];
}

type Revenue = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
};

export type PieStats = {
    orderFullfillment:{
        processing: number;
        shipped: number;
        delivered: number;
    };
    productCategories:Record<string, number>[];
    stockAvailability:{
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: Revenue;

    usersAgeGroup:{
        teen: number;
        adult: number;
        old: number;
    };
    adminCustomer:{
        admin: number;
        customer: number;
    };
}

export type BarStats = {
    product: number[];
    users: number[];
    orders: number[];
};

export type LineStats = {
    users: number[];
    product: number[];
    discount:number[];
    revenue:number[];
};