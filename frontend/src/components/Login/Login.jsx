import React, { useState, useEffect, useContext } from 'react';
import './Login.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const Login = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] =useState("Login");
    const [data, setData] =useState({
      name: "",
      email: "",
      password: ""
    })


    const onchangeHandler = (event) =>{
      const name= event.target.name;
      const value= event.target.value;
      setData (data=>({...data,[name]:value}))
    }

     useEffect(()=>{
      console.log(data)
    },[data])

    const onLogin =async(event) =>{
      event.preventDefault();
      let newurl= url;
      if(currState==="Login"){
        newurl +="/api/user/login"
      }
      else{
        newurl +="/api/user/register"
      }

      const response = await axios.post(newurl,data);

      if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }
    
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
           <h2>{currState}</h2> 
           <img onClick={()=>setShowLogin(false)}  src={assets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs'>
            {currState ==="Login"
            ?<></>
            :<input name='name' value={data.name} onChange={onchangeHandler} type='text' placeholder='Enter your Name' required  />}
            <input name='email' value={data.value} onChange={onchangeHandler} type='email' placeholder='Enter Your Mail' required />
            <input name='password' value={data.password}  onChange={onchangeHandler} type='password' placeholder='Password' required />
        </div>

        <button type='submit'>{currState ==="Sign Up"? "Create account": "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to the terms of use & privacy policy </p>
        </div>
        {currState ==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span> </p>
        :<p>Already have an account ? <span onClick={()=>setCurrState("Login")}> Login here</span></p>

        }
        
       
      </form>
    </div>
  );
}

export default Login;
