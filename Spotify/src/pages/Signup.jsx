import React, { useState } from "react";
import { assets } from "../assets/assets";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        password,
      });

      setMessage(response.data.message);

      if (response.data.status) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setMessage(
        err.response?.data.message || "Signup failed. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center text-white font-circular">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-5">
          <img src={assets.main_logo} alt="Nirvify Logo" className="h-24" />
        </div>

        <h1 className="text-center text-5xl font-bold py-1">
          <span>Sign up to</span>
        </h1>
        <h1 className="text-center text-5xl font-bold mb-8 py-2">
          <span>start listening</span>
        </h1>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-3 flex justify-center ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}>
            <ExclamationCircleIcon className="h-6 w-6 mr-0.5" />
            {message}
          </div>
        )}

        <form
          className="space-y-4 flex flex-col items-center"
          onSubmit={handleSignup}>
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setMessage("");
              }}
              placeholder="username"
              className="w-full px-4 py-2 bg-black border border-zinc-400 rounded placeholder:text-zinc-400 text-white hover:border-slate-50 focus:border-white"
            />
          </div>
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              placeholder="name@domain.com"
              className="w-full px-4 py-2 bg-black border border-zinc-400 rounded placeholder:text-zinc-400 text-white hover:border-slate-50 focus:border-white"
            />
          </div>
          <div className="relative w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 bg-black border border-zinc-400 rounded placeholder:text-zinc-400 text-white hover:border-slate-50 focus:border-white"
            />
            <button
              type="button"
              className="absolute inset-y-9 -right-3 px-6 text-gray-400"
              onClick={() => setPasswordShown(!passwordShown)}>
              {passwordShown ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="w-full max-w-xs">
            <button
              type="submit"
              className="w-full bg-bianchigreen_dark hover:bg-bianchigreen transform transition-transform duration-100 hover:scale-105 hover:font-medium text-black font-medium py-2 mb-3 rounded-full">
              Next
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-5">
          <hr className="w-full border-zinc-400" />
          <span className="px-4 text-sm text-zinc-400">or</span>
          <hr className="w-full border-zinc-400" />
        </div>

        <div className="text-center mt-8">
          <span className="text-sm text-zinc-400">
            Already have an account?{" "}
          </span>
          <NavLink
            to="/login"
            className="text-white text-sm underline hover:text-bianchigreen_dark">
            Log in here.
          </NavLink>
        </div>
      </div>

      <footer className="text-center text-xs text-zinc-400 mt-8 mb-4">
        © 2024 Nirvify. All rights reserved.
      </footer>
    </div>
  );
};

export default Signup;
