import { useState } from "react";
import api from "../services/api";

export default function Login(){
    //vars
    const [username , setusername] = useState("");
    const[password , setpassword] = useState("");
    const handleLogin= async(e: React.FormEvent)=>{
        e.preventDefault();
        try {
          const res = await api.post(

            "/auth/loginUser",
            {username , password},
          ) ;
          alert(res.data);
          setusername("");
          setpassword("");
          localStorage.setItem("token" ,
            res.data.token
          );
          window.location.href="/dashboard";
        } catch (error :any)  {
            alert(error.data.message);
            
        }
    };
    return(
        
       <form onSubmit={handleLogin}>
        <h1>LOGIN</h1>
  <input
    type="text"
    placeholder="username"
    value={username}
    onChange={(e) => setusername(e.target.value)}
  />

  <input
    type="password"
    placeholder="password"
    value={password}
    onChange={(e) => setpassword(e.target.value)}
  />

  <button type="submit">LOGIN</button>
</form>
    );
}
