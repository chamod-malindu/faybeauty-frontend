import toast from "react-hot-toast";
import { googleLoginUser, loginUser, registerUser } from "../api/userApi";
import { mergeCartOnLogin } from "../utils/cart";

// Normal login handler
export async function handleLogin(email, password) {
  try {
    const response = await loginUser({ email, password });
    const { token, role } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", token);

    // Cart merg only for users
    if (role === "user") {
      await mergeCartOnLogin(token);
    }

    toast.success("Login successful!");
    return role;

  }catch(err) {
    console.log(err);
    toast.error("Login failed!");
    return null;
  }
}

// Google login handler
export async function handleGoodleLogin(googleToken) {
  try {
    const response = await googleLoginUser(googleToken);
    const { token, role } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", token);

    // Cart merge only for users
    if (role === "user") {
      await mergeCartOnLogin(token);
    }

    toast.success("Login successful!");
    return role;

  }catch(err) {
    console.log(err);
    toast.error("Google login failed!");
    return null;
  }
}

// Register handler
export async function handleRegister(userData) {
  try{
    const response = await registerUser(userData);
    toast.success(response.data.message || "Registration successful! Please login.");
    return true;

  }catch(err) {
    console.log(err);
    toast.error(err.response.data.message || "Registration failed!" );
    return false;
  }
}