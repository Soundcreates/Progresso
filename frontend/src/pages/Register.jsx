import React, { useState } from "react";
import { api } from "../service/api.js";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData, // ✅ send the object directly
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.status === 200 || response.status == 201) {
        navigate("/home");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full  font-mono h-screen flex bg-emerald-700 text-stone-200 flex-col relative">
      <div className="w-full h-full   flex flex-col   transition-all duration-300">
        <div className="text-5xl p-5 font-bold flex flex-col gap-4">
          <h1>Hello there,</h1>
          <h1 className="text-3xl font-semibold">Create your account!</h1>
        </div>
      </div>
      <div className="w-full h-full py-20 flex justify-center items-center  ">
        <div className="w-[30%] h-[350px] rounded-[5px] border-1 border-white  flex flex-col items-center justify-between py-5 shadow-md hover:shadow-3xl text-zinc-800 cursor-pointer hover:scale-110 bg-green-900  transition-all duration-300 z-10">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex   w-full flex-col">
              <label
                className="text-xl  text-stone-300 font-mono font-semibold"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                type="text"
                className="border  w-[250px] h-[40px] rounded-md bg-stone-200"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            <div className="flex   w-full flex-col">
              <label
                className="text-xl  text-stone-300 font-mono font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="border  w-[250px] h-[40px] rounded-md bg-stone-200"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex   w-full flex-col">
              <label
                className="text-xl  text-stone-300 font-mono font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="border  w-[250px] h-[40px] rounded-md bg-stone-200"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Register"
              className="bg-stone-200 hover:bg-blue-500 hover:text-white cursor-pointer hover:scale-95 rounded-lg transition-all duration-300 "
            />
          </form>
          <p className="text-white font-semibold">
            Already a member ?{" "}
            <Link
              className="text-white hover:text-blue-500 transition-all duration-200"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
