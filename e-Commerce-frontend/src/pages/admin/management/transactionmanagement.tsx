import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import { server } from "../../../redux/store";
import { UserReducerIninitialState } from "../../../types/reducerTypes";
import { Order, OrderItem } from "../../../types/types";
import { SkeletonLoader } from "../../../components/loader";
import { responseToast } from "../../../utils/feature";


const defaultData:Order = {
  shippingInfo:{
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems:[],
  user:{
    name:"",
    _id:"",
  },
  _id:"",
}

const TransactionManagement = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const { user } = useSelector(
    (state: {userReducer: UserReducerIninitialState}) => state.userReducer
  );

  const {isLoading,data,isError} = useOrderDetailsQuery(params.id!);
  console.log(data);

  const {
    shippingInfo:{address,city,state,pincode,country},
    orderItems,
    user:{name},
    status,
    subTotal,
    total,
    discount,
    tax,
    shippingCharges
  } = data?.order || defaultData;



  const updateHandler = async()=> {
    const res = await updateOrder({
      userID : user?._id || "",
      orderID : data!.order._id,
    });
    responseToast(res,navigate, "/admin/transaction");
  };

  const deleteHandler = async() => {
    const res = await deleteOrder({
      userID : user!._id,
      orderID : data!.order._id,
    });
    responseToast(res,navigate, "/admin/transaction");
  };

  if(isError) return <Navigate to= {"/404"}/>

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (<SkeletonLoader/>) : 
            <>
                              <section
                  style={{
                    padding: "2rem",
                  }}
                >
                  <h2>Order Items</h2>
        
                  {orderItems.map((i) => (
                    <ProductCard
                      key={i._id}
                      name={i.name}
                      photo={`${server}/${i.photo}`}
                      productId={i.productId}
                      _id={i._id}
                      quantity={i.quantity}
                      price={i.price}
                    />
                  ))}
                </section>
        
                <article className="shipping-info-card">
                  <button className="product-delete-btn" onClick={deleteHandler}>
                    <FaTrash />
                  </button>
                  <h1>Order Info</h1>
                  <h5>User Info</h5>
                  <p>Name: {name}</p>
                  <p>
                    Address: {`${address}, ${city}, ${state}, ${country} ${pincode}`}
                  </p>
                  <h5>Amount Info</h5>
                  <p>Subtotal: {subTotal}</p>
                  <p>Shipping Charges: {shippingCharges}</p>
                  <p>Tax: {tax}</p>
                  <p>Discount: {discount}</p>
                  <p>Total: {total}</p>
        
                  <h5>Status Info</h5>
                  <p>
                    Status:{" "}
                    <span
                      className={
                        status === "Delivered"
                          ? "purple"
                          : status === "Shipped"
                          ? "green"
                          : "red"
                      }
                    >
                      {status}
                    </span>
                  </p>
                  <button className="shipping-btn" onClick={updateHandler}>
                    Process Status
                  </button>
                </article>
            </>
        
        }
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
