"use client"
import Link from "next/link"
import React, { useEffect , useState } from "react"
import  { useRouter } from "next/navigation"
import  axios  from "axios"



export default function SingupPage(){
    const router = useRouter();
    const [user,setuser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisbled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const onSingup = async ()=>{
            try {
                console.log("tyring");
                
                setLoading(true);
           const response = await axios.post("/api/users/singup", user);
            console.log(response);
            
            console.log("sing up success",response.data);
             router.push("/login");
            
            } catch (error) {
                console.log("failed");
                
            }
            finally{
                setLoading(false)
               
            }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])
    return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-black py-10 px-4">
    <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-4">{loading?"Processing":"Singup"}</h1>
        <hr className="mb-6 border-gray-700" />

        <label htmlFor="username" className="block text-gray-300 font-medium mb-2">
            Username
        </label>
        <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
      onClick={onSingup} // replace with your actual signup function
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"  >
        {buttonDisbled?"no sing up ":"sing up"}
      </button>
       <Link
        href="/login"
        className="block mx-auto w-max text-gray-400 hover:text-gray-200 transition"
        >
            Visit Login
      </Link>  
    </div>
    </div>


           
        
    )
}