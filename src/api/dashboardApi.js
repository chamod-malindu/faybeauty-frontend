import api from "../config/axiosConfig";


export default async function fetchDashboardData() {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
    throw error;
  }
}