import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cartItem";
import { addToCart, calculatePrice, discountApplied, removeFromCart } from "../redux/reducer/cartReducer";
import { CartReducerIninitialState } from "../types/reducerTypes";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";


const Cart = () => {

  const dispatch = useDispatch();
  const {cartItems,subTotal,discount,tax,total,shippingCharges} = 
  useSelector((state:{cartReducer: CartReducerIninitialState}) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) =>{
    if(cartItem.quantity >= cartItem.stock){
      return;
    }
    dispatch(addToCart({...cartItem , quantity: cartItem.quantity+1}));
  };
  const decrementHandler = (cartItem: CartItem) =>{

    if(cartItem.quantity <= 1){
      return;
    }
    dispatch(addToCart({...cartItem , quantity: cartItem.quantity-1}));
  };

  const removeHandler = (productId:string) =>{
    dispatch(removeFromCart(productId));
  };


  useEffect(() => {
    const {token: cancelToken,cancel} = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken,})
       .then((res) => {
         dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        }).
        catch(() => {
         dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000)
    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    }
  }, [couponCode,dispatch]);
  
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems,dispatch])
  


  return (
    <div className="cart">
      <main>
      {cartItems.length > 0 ? (
        cartItems.map((i,idx) => (< CartItemCard
          incrementHandler = {incrementHandler}
          decrementHandler = {decrementHandler}
          removeHandler = {removeHandler}
          key={idx} 
          cartItem={i}/>
        ))
      ):(
        <h1>Cart is empty</h1>
      )};
      </main>

      <aside>
        <p>Subtotal: ₹{subTotal} </p>
        <p>Shipping Charges: ₹{shippingCharges} </p>
        <p>Tax: ₹{tax} </p>
        <p>
         Discount: <em className="red"> - ₹{discount} </em>
        </p>
        <p>
         <b>Total: ₹{total} </b>  
        </p>

        <input 
          type="text" 
          placeholder="Coupon Code" 
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)} 
        />
        { couponCode && (isValidCouponCode ? 
         (<span className="green">₹{discount} off using the <code>{couponCode}</code></span>): 
         (<span className="red">
            Invalid Coupon <VscError/>
          </span>))}

          {
            cartItems.length > 0 && <Link to= "/shipping">Checkout</Link>
          }

      </aside>
    </div>
  )
}

export default Cart
