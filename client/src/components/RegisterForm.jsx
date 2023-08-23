import React, { useContext, useState } from "react";
import authContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { getLoggedInUserData, isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext);

  const [credentials, setCredetials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredetials({ ...credentials, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responce = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const {success, authToken} = await responce.json();

    // console.log(authToken);
    setCredetials({ name:"", email: "", password: "" });
    if (success) {
      localStorage.setItem('authToken', authToken);
      setIsUserLoggedIn(true);
      navigate('/');
      console.log("Account created");
      getLoggedInUserData();
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-10">
      <div className="flex flex-col bg-slate-300 p-3 rounded-lg">
        <h1 className="text-center w-full mb-3">Register Form</h1>
        <form
          id="login"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >

          <div className="flex justify-between items-center">
            <h1>Name</h1>
            <input
              name="name"
              value={credentials.name}
              onChange={onChange}
              type="text"
              className="ml-3 px-2 py-1 outline-none rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Email</h1>
            <input
              name="email"
              value={credentials.email}
              onChange={onChange}
              type="email"
              className="ml-3 px-2 py-1 outline-none rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Password</h1>
            <input
              name="password"
              value={credentials.password}
              onChange={onChange}
              type="text"
              autoComplete="off"
              className="ml-3 px-2 py-1 outline-none rounded-lg"
            />
          </div>
          <h4 className="text-center -my-2 text-base">
            already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600"
            >
              login
            </button>
          </h4>

          <div className="flex justify-between items-center">
            <button className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg w-full">
              Register
            </button>
          </div>
        </form>
      </div>
      <h1 className="mt-20">{isUserLoggedIn ? "Logged in" : "not logged in"}</h1>
    </div>
  );
};

export default RegisterForm;
