import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import toast from "react-hot-toast";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { handleGoodleLogin, handleLogin } from "../services/authService";

export default function loginPage() {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();
  const[isLoading, setIsLoading] = useState(false);
  const[isGoogleLoading, setIsGoogleLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => { 
      try {
        setIsGoogleLoading(true);

        const role = await handleGoodleLogin(response.access_token);

        if (role === "admin") {
          navigate("/admin");

        } else if (role === "user") {
          navigate("/");
        }

      } catch (err) {
        console.error(err);

      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login failed!");
    }
  });

  const login = async () => {
    try {
      setIsLoading(true);
      const role = await handleLogin(email, password);

      if (role === "admin") {
          navigate("/admin");

      } else if (role === "user") {
        navigate("/");
      }

      setIsLoading(false);

    }catch(err) {
      console.log(err);
      setIsLoading(false);
    }
  } 

  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex">
      <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] mt-[8%] ml-[9%] relative flex flex-col items-center justify-center gap-[20px]">
        
        {/* Heading */}
        <h1 className="absolute top-[20px] text-2xl font-bold text-accent-hover text-center my-5">
          Login
        </h1>

        {/* Email Input field */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg text-accent-hover mb-[2px] font-semibold">Email</span>
          <input
            type="text"
            className="w-[350px] h-[40px] text-accent-hover pl-[10px] border rounded-xl border-accent focus:text-white focus:pl-[10px]"
            placeholder="eg: example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input field */}
        <div className="flex flex-col">
          <span className="text-lg text-accent-hover mb-[2px] font-semibold">Password</span>
          <input
            type="password"
            className="w-[350px] h-[40px] text-accent-hover border pl-[10px] border-accent rounded-xl focus:text-white focus:pl-[10px]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Forget Password Link */}
        <div className="w-[350px] relative mb-[7px]">
        <Link
          to="/forget-password"
          className="absolute left-[0px] text-accent text-[14px] hover:text-white"
        >
          Forget Password?
        </Link>
        </div>

        {/* Login Button */}
        <button
          disabled={isLoading}
          className="w-[350px] h-[40px] bg-accent-hover rounded-xl text-lg text-white hover:bg-accent hover:border-accent hover:border cursor-pointer transition-all duration-300"
          onClick={login}
        >
          {isLoading ? "Loading..." : "Login Now"}
        </button>
        <button
          disabled={isGoogleLoading}
          className="w-[350px] h-[40px] bg-accent-hover rounded-xl text-lg text-white hover:bg-accent hover:border-accent hover:border cursor-pointer transition-all duration-300"
          onClick={googleLogin}
        >
          {isGoogleLoading ? "Loading..." : "Google Login"}
        </button>

        {/* Sign Up Link */}
        <p className="text-white text-[14px]">
          Don't have an account?{" "}
          <Link to="/register" className="text-accent hover:text-white">
            Sign up
          </Link>{" "}
          from here
        </p>
      </div>
    </div>
  );
}
