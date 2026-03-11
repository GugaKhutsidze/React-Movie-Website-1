import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "../index.css"
function Register(){
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    async function handleRegister(){
        const url="https://warrior.ge/api/register"
        try{
            const res=await axios.post(url,{
                name,
                email,
                password
            })
            alert(" შესვლა წარმატებით დასრულდა!")
            window.location.href="/"
        }catch(e){ 
             console.log(e)
             alert("არასწორი მომხმარებლის პაროლი")
        }
    
    }
    return(
        <div className="login-container">
            <div className="login-form">
                <h2>რეგისტრაცია</h2>
                <input type="text" placeholder="სახელი და გვარი" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="ელფოსტა" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="პაროლი" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={handleRegister} >რეგისტრაცია</button>
                 <p style={{ fontSize: "14px", marginTop: "10px" }}> უკვე გაქვთ ანგარიში? <Link to="/login">შესვლა</Link>
                </p>

              
            </div>
        </div>  
    )
}   

export default Register