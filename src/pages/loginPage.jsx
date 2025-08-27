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
      <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] mt-[9%]  ml-[9%] relative flex flex-col items-center justify-center gap-[20px] ">
        <h1 className="absolute top-[20px] text-2xl font-bold text-center my-5">Login</h1>
        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Email</span>
          <input type="text" className="w-[350px] h-[40px] border rounded-xl" 
          onChange={
            (e) => {
              setEmail(e.target.value);
            }
          }/>
        </div>
        <div className="flex flex-col"> 
          <span className="text-lg">Password</span>
          <input type="password" className="w-[350px] h-[40px] border rounded-xl" 
          onChange={
            (e) => {
              setPassword(e.target.value);
            }
          }/>
        </div>
        <button className="w-[350px] h-[40px] bg-amber-900 rounded-xl text-lg mt-5 hover:bg-amber-950 transition-all duration-300"
        onClick={login}>
          Login Now
        </button>
        <p>Don't have an account? <Link to="/register" children>Sign up</Link> from here</p>

      </div>

    </div>
  )
}
