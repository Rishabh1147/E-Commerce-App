import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const loginHandler = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const { user }  = await signInWithPopup(auth,provider);
            console.log(user);
            
        } catch (error) {
            console.log(error);
            toast.error("SignIn failed");
        }

    }


  return (
    <div className="login">
        <main>
            <h1 className="heading">LogIn</h1>
            <div>
                <label>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="">Other</option>
                </select>
            </div>
            <div>
                <label>Date of birth</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
                <p>Already User? </p>
                <button onClick={loginHandler}>
                    <FcGoogle/> <span>SignIn with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login;