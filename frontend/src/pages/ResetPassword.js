import { useState } from "react";
import axios from "axios";

function ResetPassword(){

  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const resetPassword = async ()=>{

    try{

      const res = await axios.post(
        "http://localhost:5000/api/reset-password",
        { email,otp,password }
      );

      setMessage(res.data.message);

    }catch(error){

      setMessage(error.response?.data?.message);

    }

  };

  return(

    <div>

      <h2>Reset Password</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        placeholder="OTP"
        onChange={(e)=>setOtp(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={resetPassword}>
        Reset Password
      </button>

      <p>{message}</p>

    </div>

  )

}

export default ResetPassword;