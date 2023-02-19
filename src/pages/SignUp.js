import React, { useRef, useState } from 'react';
import "./SignUp.css"

const SignUp = () => {
   const inputEmailRef = useRef();
   const inputPasswordRef = useRef();
   const inputCofirmPasswordRef = useRef();
    const [login,setLogin] = useState(true);
   
    const submitHandler =  async (event)=>{
       event.preventDefault();
       const email = inputEmailRef.current.value;
       const password = inputPasswordRef.current.value;

       if(!login){
        if(password !==inputCofirmPasswordRef.current.value){
          return alert("password and Confrim password are not same");
        }
       }
       let url = "";
       if(login){
         url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg  "
       }else{
          url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg"
       }

       try{
        const res = await fetch(url,{
            method: "POST",
            body : JSON.stringify({
              email:inputEmailRef.current.value,
              password: inputPasswordRef.current.value,
            }),
              headers:{
                "Content-Type" : "application/json",
              },
        })
         if(res.ok){
          const data = await res.json();
          localStorage.setItem("idtoken",JSON.stringify(data));
          console.log(data)
            setLogin(true);
            inputEmailRef.current.value="";
            inputPasswordRef.current.value="";
            console.log("all ok")
            if(!login){
              inputCofirmPasswordRef.current.value="";
              alert('signUp successful');
            
            }else{
              alert("login sucessfull")
            }
         }else{
          const data = await res.json();
          throw data.error;
         }
       } catch(error){
         console.log(error.message) 
       }
    };

    const accountHandler = ()=>{
      setLogin((prev)=>!prev);
    }
  return (
    <div className='wrapper'>
<form onSubmit={submitHandler} className='form'>
    <label htmlFor='email'>E-mail</label>
    <input type="email" id="email" ref={inputEmailRef} required />

    <label htmlFor='password'>Password</label>
    <input type="password" id="password" ref={inputPasswordRef} required />

{!login && (
    <>
        <label htmlFor='confirmpassword'>Confirm Password</label>
    <input type="password" ref={inputCofirmPasswordRef} required/>

    </>
)}
   
 <button type='submit'>{login ?"Login" : "Sign Up"}</button>
  <div onClick={accountHandler} className='signup-login'>
  {login ? "click here to Sign Up" : "click here to Login"}
  </div>
  <button>Submit</button>
</form>
    </div>
  )
}

export default SignUp;