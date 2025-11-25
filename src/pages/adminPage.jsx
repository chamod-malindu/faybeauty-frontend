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
    <div className="w-full h-full flex">
      <div className="w-[300px] min-h-screen flex flex-col items-center shadow-xl">
        <span className="text-3xl font-bold my-5"> Admin Panel </span>
        <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin"> <MdDashboard /> Dashboard </Link>
        <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/products"> <GiLipstick /> Products </Link>
        <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/orders"> <HiShoppingBag /> Orders </Link>
        <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/users"> <ImUsers /> Users </Link>
        <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px] hover:bg-accent hover:text-white" to="/admin/settings"> <IoSettings /> Settings </Link>

      </div>
      <div className="w-[calc(100%-300px)] h-full px-10 py-7">
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