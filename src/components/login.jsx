import { useContext, useRef, useState } from "react";
import { client } from "../featherSetup";
import { DataContext } from "../store/store";
export const LoginForm=()=>{
const {setIsLoggedIn,isLoggedIn,handleLogin,handleSignup,error}=useContext(DataContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const emailRef=useRef()
    const passwordRef=useRef()
    const handleSubmit=(type)=>{
        const email=emailRef.current.value
        const password=passwordRef.current.value
        if(type == "login"){
            handleLogin(email,password)
        }
        if(type == "signup"){
            handleSignup(email,password)
        }
    }   
    return <div className="login flex min-h-screen bg-neutral justify-center items-center">
    <div className="card w-full max-w-sm bg-base-100 px-4 py-8 shadow-xl">
      <h1 className="text-5xl font-bold text-center my-5 bg-clip-text bg-gradient-to-br">
        Feathers Chat
      </h1>
      <form className="card-body pt-2">
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="enter email"
            className="input input-bordered"
           ref={emailRef}
          />
        </div>
        <div className="form-control mt-0">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            className="input input-bordered"
            ref={passwordRef}
          />
        </div>
        <div className="form-control mt-6">
          <button type="button" className="btn" onClick={()=>{handleSubmit("login")}}>
            Login
          </button>
        </div>
        <div className="form-control mt-6">
          <button type="button" className="btn" onClick={()=>{handleSubmit("signup")}}>
            Signup
          </button>
        </div>
        {error && <div className="form-control mt-6 text-red-500">{error}</div>}
       
      </form>
    </div>
  </div>
}