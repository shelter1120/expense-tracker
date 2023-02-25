import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./MainNavigation.css"
import { useSelector,useDispatch } from "react-redux";
import { authAction } from "../store/Auth";

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const auth = useSelector((state)=>state.auth.isAuthenticated);

 useEffect(()=>{
  if(localStorage.getItem("idtoken")== null){
    dispatch(authAction.logout());
  }else{
    dispatch(authAction.login());
  }
 
 })

  const logoutHandler = async ()=>{
     await localStorage.removeItem('idtoken');
     await localStorage.removeItem("email");
    navigate("/login");
    dispatch(authAction.logout());
    alert("logout sucessfully")
  }

  return (
    <div className="mainNav">
      <nav>
        <ul>
          {auth && (
            <>
              <li>
                <NavLink to="/home">Update Profile</NavLink>{" "}
              </li>
              <li>
                <NavLink to="/expense">Expenses</NavLink>
              </li>
              <li>
                <NavLink onClick={logoutHandler}>Logout</NavLink>
              </li>{" "}
            </>
          )}
          {!auth && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
