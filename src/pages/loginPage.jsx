import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import toast from "react-hot-toast";

export default function loginPage() {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    console.log(email, password);
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      email: email,
      password: password
    }).then(
      (response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);

        toast.success("Login successful!");
        if(response.data.role == "admin") {
          //window.location.href = "/admin";
          navigate("/admin");
        }else if(response.data.role == "user") {
          //window.location.href = "/";
          navigate("/");
        }
      }
    ).catch
      ((error) => {
        console.log(error);
        toast.error("Login failed!");
        
      })
  }

  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex">
      <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] mt-[7%] ml-[9%] relative flex flex-col items-center justify-center gap-[20px]">
        
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
            className="w-[350px] h-[40px] border border-accent rounded-xl focus:text-white focus:pl-[10px]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Forget Password Link */}
        <Link
          to="/forget-password"
          className="absolute left-[77px] top-[280px] text-accent text-[14px] hover:text-white"
        >
          Forget Password?
        </Link>

        {/* Login Button */}
        <button
          className="w-[350px] h-[40px] bg-accent-hover rounded-xl mt-5 text-lg text-white hover:bg-accent hover:border-accent hover:border cursor-pointer transition-all duration-300"
          onClick={login}
        >
          Login Now
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
