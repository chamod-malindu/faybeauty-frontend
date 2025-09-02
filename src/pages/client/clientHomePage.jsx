import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";

export default function ClientHomePage() {
  return (
    <div className="w-full h-screen">
      <Header />
      <Routes path="/">
        <Route path="/" element={<h1 className="text-center mt-10 text-3xl font-bold">Welcome to the Home Page</h1>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/reviews" element={<h1 className="text-center mt-10 text-3xl font-bold">Reviews Page</h1>} />
        <Route path="/aboutUS" element={<h1 className="text-center mt-10 text-3xl font-bold">About Us Page</h1>} />
        <Route path="/contactUS" element={<h1 className="text-center mt-10 text-3xl font-bold">Contact Us Page</h1>} />
        <Route path="/overview" element={<ProductOverviewPage />} />
        <Route path="/*" element={<h1 className="text-center mt-10 text-3xl font-bold">404 - Page Not Found</h1>} />
      </Routes>
    </div>
  )

}