"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import  axios  from "axios"



export default function LoginPage(){
    const router = useRouter()
    const [loading,setLoading] = React.useState(false)
    const [user,setuser] = React.useState({
        email:"",
        password:"",
        
    })
    const [buttonDisable,setButtonDisabled] = React.useState(false);
    const onLogin = async ()=>{
        try {
            setLoading(true);
        const response =    await axios.post("/api/users/login",user);
        console.log("loged in",response.data);
        router.push("/profile")
        

        } catch (error) {
            console.log("error");
            
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
       if(user.email.length>0 && user.password.length>0 ){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])

    return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-black py-10 px-4">
    <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-4">{loading?"processing":"login"}</h1>
        <hr className="mb-6 border-gray-700" />

        
        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
            email
        </label>
        <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
            password
        </label>
        <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <button
      onClick={onLogin} // replace with your actual signup function
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"  >
        Login Here
      </button>
      <Link
        href="/singup"
        className="block mx-auto w-max text-gray-400 hover:text-gray-200 transition"
        >
            Visit Signup
      </Link>  
    </div>
    </div>


           
        
    )
}