import React, { useState } from "react";
import api from "../services/api";

export const Register=()=>{
    //vars
    const [ username , setusername] = useState("");
    const[password , setpassword] = useState("");

    const handleRegister = async(e: React.FormEvent)=>{
        //prevent form reloading when form is submitted.
        e.preventDefault();
        try {
            const res = await api.post(
                "/auth/registerUser",
                {username , password}
            );
            alert(res.data.message);
            //clar form after submission
            setusername("");
            setpassword("");
        } catch (error :any) {
            alert(error.response?.data?.message || 
                "registration failed"
            );
            
        }
    };
    return(
        <div>
            <h1>REGISTER</h1>
            <form onSubmit={handleRegister}>
                <input type="text"
                placeholder="uername"
                value={username}
                onChange={(e)=>setusername(e.target.value)} />

                <input type="password" 
                placeholder="password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)} />

                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
}
export default Register;