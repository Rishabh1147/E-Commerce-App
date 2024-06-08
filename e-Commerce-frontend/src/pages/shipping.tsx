import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import { CartReducerIninitialState } from "../types/reducerTypes";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {

  const {cartItems,total} = 
  useSelector((state:{cartReducer: CartReducerIninitialState}) => state.cartReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[shippingInfo, setShippingInfo] = useState({
        address:"",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
        setShippingInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    
    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(saveShippingInfo(shippingInfo));

        try {
            const {data} =  await axios.post(`${server}/api/v1/payment/create`,{
                amount: total,
            },{
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate("/pay",{
                state: data.clientSecret,
            })
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
    if(cartItems.length <= 0) return navigate("/cart");
    },[cartItems, navigate])
    


  return (
    <div className="shipping">
        <button className="back-btn" onClick={() => navigate("/cart")}>{<BiArrowBack/>}</button>

        <form onSubmit={submitHandler}>
            <h1>Shipping Address</h1>
            <input type="text" 
                required
                placeholder="Address"
                name="address"
                value={shippingInfo.address}
                onChange={changeHandler}
            />
            <input type="text" 
                required
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={changeHandler}
            />
            <input type="text" 
                required
                placeholder="State"
                name="state"
                value={shippingInfo.state}
                onChange={changeHandler}
            />
            <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                <option value="country">Choose Country</option>
                <option value="india">India</option>

            </select>
            <input type="number" 
                required
                placeholder="PinCode"
                name="pincode"
                value={shippingInfo.pincode}
                onChange={changeHandler}
            />
            
            <button type="submit">Pay Now</button>
            
        </form>
    </div>
  )
}

export default Shipping;



