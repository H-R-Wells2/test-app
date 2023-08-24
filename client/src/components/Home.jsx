import React, { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import RecordVideo from "./RecordVideo";
import RecordScreen from "./RecordScreen";

const Home = () => {
  const { loggedInUserData, isUserLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    console.log(loggedInUserData);
  });

  const { name, email } = loggedInUserData;

  return (
    <div className="flex flex-col justify-center mx-auto">
      <div className="flex flex-col w-fit mx-auto justify-center">
        <h2>Name: {name}</h2>
        <h2>Email: {email}</h2>
      </div>
      <div className="flex flex-col w-fit mx-auto justify-center">

      <RecordVideo/>
      <RecordScreen/>
      </div>
    </div>
  );
};

export default Home;
