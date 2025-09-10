import { Link, Route, Routes } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProductPage";
import OrdersAdminPage from "./admin/ordersAdminPage";

export default function adminPage() {

  return(
    <div className="w-full h-screen  flex">
      <div className="w-[300px] h-screen flex flex-col items-center">
        <span className="text-3xl font-bold my-5"> Admin Panel </span>
        <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/products"> <AiFillProduct /> Products </Link>
        <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/orders"> <HiShoppingBag /> Orders </Link>
        <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/users"> <ImUsers /> Users </Link>
        <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/settings"> <IoSettings /> Settings </Link>

      </div>
      <div className="w-[calc(100%-300px)] h-screen">
        <Routes path="/">
          <Route path="/" element={<h1>Dashboard</h1>}/>
          <Route path="/products" element={<ProductsAdminPage />}/>
          <Route path="/newProduct" element={<AddProductAdminPage />}/>
          <Route path="/orders" element={<OrdersAdminPage />}/>
          <Route path="/updateProduct" element={<UpdateProductPage />}/>
        </Routes>
        </div>
    </div>
  )
}