import React from "react";
import { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios"
import "../index.css"
function Login(){
    async function handleLogin(){
        const url="https://warrior.ge/api/login"
        try{
            const res=await axios.post(url,{
                email,
                password
            })
            localStorage.setItem("token",res.data.token)
            alert(" შესვლა წარმატებით დასრულდა!")

        }catch(e){ 
             console.log(e)
             alert("არასწორი მომხმარებლის პაროლი")
        }
    }
    
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    return(
        <div className="login-container">
            <div className="login-form">
                <h2>შესვლა</h2>
                <input type="text" placeholder="ელფოსტა" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="პაროლი" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={handleLogin}>შესვლა</button>
                <p style={{ fontSize: "14px", marginTop: "10px" }}> ჯერ არ გაქვთ ანგარიში? <Link to="/register">რეგისტრაცია</Link>
                </p>
              
            </div>
        </div>  
    )
}

export default Login