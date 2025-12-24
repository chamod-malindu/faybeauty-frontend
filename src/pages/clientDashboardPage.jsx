import { Link, Route, Routes } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { ImUser } from "react-icons/im";
import ClientDashboardOverviewPage from "./client/dashboard/clientOverviewPage";
import ClientProfilePage from "./client/dashboard/clientProfilePage";
import MyOrdersPage from "./client/dashboard/myOrdersPage";
import { useUser } from "../hooks/useUserQueries";
import logout from "../utils/logout";

export default function ClientDashboard(){
  const { data: userData, isLoading, isError } = useUser();

  return (
    <div className="w-screen h-full flex m-0 p-0">
      <div className="w-[280px] min-h-screen flex flex-col items-center shadow-xl">
        <div className="w-full flex flex-col mt-5 pb-2 justify-start border-b border-accent pl-5">
          <h1 className="text-2xl font-bold font-serif"> Welcome ! </h1>
          <span className="font-semibold text-lg font-serif pl-15">{userData?.firstName}</span>
        </div>
        <Link to="/client/dashboard" className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white"> <MdDashboard /> Overview </Link>
        <Link to="/client/dashboard/orders" className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white"> <HiShoppingBag /> My Orders</Link>
        <Link to="/client/dashboard/profile" className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white"> <ImUser /> Profile</Link>
      </div>
      <div className="w-full min-h-screen p-8">
        <div className="font-serif flex justify-end items-center gap-6 text-accent">
        <Link to="/" className="hover:text-shadow-accent-hover">Home</Link>
        <button 
          className=" hover:text-shadow-accent-hover cursor-pointer"
          onClick={() => logout()}
        >Logout</button>
      </div>
        <Routes path="/" >
        <Route path="/" element={<ClientDashboardOverviewPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/profile" element={<ClientProfilePage />} />
      </Routes>
      </div>
      
    </div>
  )
}