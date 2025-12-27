import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";
import OrdersHistoryPage from "./ordersHistoryPage";
import ContactUs from "./contactPage";
import AboutUs from "./aboutUsPage";
import SiteReviews from "./siteReviewPage";


export default function ClientHomePage() {
  return (
    <div className="w-full h-screen">
      <Header />
      <Routes path="/">
        <Route path="/" element={<h1 className="text-center mt-10 text-3xl font-bold">Welcome to the Home Page</h1>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/reviews" element={<SiteReviews />} />
        <Route path="/aboutUS" element={<AboutUs />} />
        <Route path="/contactUS" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/overview/:productId" element={<ProductOverviewPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersHistoryPage />} />
        <Route path="/*" element={<h1 className="text-center mt-10 text-3xl font-bold">404 - Page Not Found</h1>} />
      </Routes>
    </div>
  )

}