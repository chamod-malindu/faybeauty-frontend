import toast from "react-hot-toast";

export default function logout() {
  // Remove token and role from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  // Optionally remove other user info
  localStorage.removeItem("user");

  // Show success toast
  toast.success("Logged out successfully");

  // Redirect to login page
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
}
