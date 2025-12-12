import toast from "react-hot-toast";
import fetchDashboardData from "../api/dashboardApi";


export default async function fetchDashboardOverview() {
  try {
    const response = await fetchDashboardData();
    console.log("Dashboard data fetched:", response);
    return response;
  } catch (error) {
    toast.error("Failed to fetch dashboard data");
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}