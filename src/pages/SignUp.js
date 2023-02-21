import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputCofirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;

    if (!login) {
      if (password !== inputCofirmPasswordRef.current.value) {
        return alert("password and Confrim password are not same");
      }
    }
    let url = "";
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg  ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg";
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setLogin(true);

        const data = await res.json();
        const useremailid = email;
        const replaceEmailId = useremailid.replace("@", "").replace(".", "");
        localStorage.setItem("email",replaceEmailId);
        localStorage.setItem("idtoken", JSON.stringify(data));
        console.log(data);
        // setLogin(true);
        inputEmailRef.current.value = "";
        inputPasswordRef.current.value = "";
        console.log("all ok");
        navigate("/home");
        if (!login) {
          inputCofirmPasswordRef.current.value = "";
          alert("signUp successful");
        } else {
          alert("login sucessfull");
        }
      } else {
        const data = await res.json();
        throw data.error;
      }
    } catch (error) {
      alert(error.message);
      //  console.log(error.message)
    }
  };

  const accountHandler = () => {
    setLogin((prev) => !prev);
  };

  const forgotPasswordHandler = () => {
    navigate("/forgotpassword");
  };
  return (
    <div className="wrapper">
      <form onSubmit={submitHandler} className="form">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" ref={inputEmailRef} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={inputPasswordRef} required />

        {!login && (
          <>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type="password" ref={inputCofirmPasswordRef} required />
          </>
        )}

        <button type="submit">{login ? "Login" : "Sign Up"}</button>
        {login && (
          <button onClick={forgotPasswordHandler} href="#">
            Forgot Password
          </button>
        )}
        <div onClick={accountHandler} className="signup-login">
          {login ? "click here to Sign Up" : "click here to Login"}
        </div>
        {/* <button>Submit</button> */}
      </form>
    </div>
  );
};

export default SignUp;
