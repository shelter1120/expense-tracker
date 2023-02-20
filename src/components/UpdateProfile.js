import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const inputFullnameRef = useRef();
  const inputPhotoUrlRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: JSON.parse(localStorage.getItem("idtoken")).idToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data =  await res.json();
        console.log(data);
        if (res.ok) {
          inputFullnameRef.current.value = data.users[0].displayName;
          inputPhotoUrlRef.current.value = data.users[0].photoUrl;
        }
      } catch (error) {
        console.log(error.message); //ithe throw error nahi kele
      }
    }
    fetchProfile();
  }, []);

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: JSON.parse(localStorage.getItem("idtoken")).idToken,
            displayName: inputFullnameRef.current.value,
            photoUrl: inputPhotoUrlRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      inputFullnameRef.current.value = "";
      inputPhotoUrlRef.current.value = "";

      if (res.ok) {
        alert("Data Updated SuccessFully");
        navigate("/home");
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="form">
      <div>
        <h2>Winner never Quits, quitter never wins</h2>
        <div>
          Your Profile is 64% complete . A complete Profile has <br />
          higher chances of landing a job{" "}
        </div>
      </div>
      <div>
        <form onSubmit={profileSubmitHandler}>
          <h3>Update Profile</h3>
          <label htmlFor="fullname">Full Name</label>
          <input ref={inputFullnameRef} type="text" />

          <label htmlFor="profileurl">Profile photo Url</label>
          <input ref={inputPhotoUrlRef} type="text" />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
