import { Link, Route, Routes } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { GiLipstick } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProductPage";
import OrdersAdminPage from "./admin/ordersAdminPage";
import UserManagementPage from "./admin/userManagementPage";
import SettingAdminPage from "./admin/settingAdminPage";
import { MdDashboard } from "react-icons/md";
import DashboardAdminPage from "./admin/dashboardAdminPage";

export default function adminPage() {

  return(
    <div className="w-screen h-full flex m-0 p-0">
      <div className="w-[280px] min-h-screen flex flex-col items-center shadow-xl">
          <span className="text-3xl font-bold my-5"> Admin Panel </span>
          <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin"> <MdDashboard /> Dashboard </Link>
          <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/products"> <GiLipstick /> Products </Link>
          <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/orders"> <HiShoppingBag /> Orders </Link>
          <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/users"> <ImUsers /> Users </Link>
          <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/settings"> <IoSettings /> Settings </Link>
      </div>
      <div className="w-[calc(100%-300px)] h-full pl-10 pr-5 pt-3 pb-7">
        <div className="h-15 flex justify-end items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-300 rounded-full">
            </div>
            <h2 className="text-lg font-mono">Kamal Perera</h2>
            <button className="bg-accent py-2 px-3 font-mono font-semibold rounded-2xl ml-3 hover:bg-accent-hover items-center justify-center shadow-lg border-2 text-lg border-accent cursor-pointer" >
            Logout
          </button>
          </div>
        </div>
        <Routes path="/">
          <Route path="/" element={<DashboardAdminPage />}/>
          <Route path="/products" element={<ProductsAdminPage />}/>
          <Route path="/newProduct" element={<AddProductAdminPage />}/>
          <Route path="/orders" element={<OrdersAdminPage />}/>
          <Route path="/updateProduct" element={<UpdateProductPage />}/>
          <Route path="/users" element={<UserManagementPage />}/>
          <Route path="/settings" element={<SettingAdminPage />}/>
        </Routes>
        </div>
    </div>
  )
}