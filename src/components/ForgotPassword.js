import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
        console.log(data);
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={forgotPasswordHandler}>
        <label htmlFor="email">Enter Your Email</label>
        <input ref={emailRef} type="email" />

        <button type="submit">Send Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
