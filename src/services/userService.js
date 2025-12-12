import toast from "react-hot-toast";
import { fetchUserDetails, updateUserDetails } from "../api/userApi";

// Fetch user details
export async function getUserById() {
  try{
    const response = await fetchUserDetails();
    return response.data.user;

  }catch(err) {
    console.log("Faild to fetch user details:", err);
    return null;
  }
}

// Update user details
export async function updateUserById(updatedUserData) {
  try{
    const response = await updateUserDetails(updatedUserData);
    toast.success("User details updated successfully!" || response.data.message);
    return response.data.user;
  }catch(err) {
    console.log("Failed to update user details:", err);
    toast.error("Failed to update user details." || err.response.data.message);
    return null;
  }
}