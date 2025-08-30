import { Link } from "react-router-dom";

export default function Header() {
  return(
    <div className="w-full h-[100px] bg-blue-600 flex justify-center items-center text-white text-2xl mb-[20px]">
      <Link to="/">Home</Link>
      <Link to="/products" className="mx-5">Products</Link>
      <Link to="/reviews">Review</Link>
      <Link to="/aboutUS" className="mx-5">AboutUs</Link>
      <Link to="/contactUS">ContactUs</Link>
    </div>
  )
}
