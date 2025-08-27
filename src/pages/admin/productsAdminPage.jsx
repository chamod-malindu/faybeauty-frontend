import { ImPlus } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function ProductsAdminPage() {
  const[products, setProducts] = useState([]);
  const[a, setA] = useState(0);
  useEffect(
    () => {
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
        (res) => {
          setProducts(res.data);
        }
        )
    },
    [a]
  )
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full border-[3px] p-4">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border border-gray-300">Image</th>
            <th className="p-2 border border-gray-300">Product Id</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Labelled Price</th>
            <th className="p-2 border border-gray-300">Stock</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12"
                />
              </td>
              <td className="p-2 border border-gray-300">{product.productId}</td>
              <td className="p-2 border border-gray-300">{product.name}</td>
              <td className="p-2 border border-gray-300 max-w-[200px] truncate">
                {product.description}
              </td>
              <td className="p-2 border border-gray-300">{product.price}</td>
              <td className="p-2 border border-gray-300">{product.labelledPrice}</td>
              <td className="p-2 border border-gray-300">{product.stock}</td>
              <td className="p-2 border border-gray-300">{product.category}</td>
              <td className="p-2 border border-gray-300 text-center">
                <button className="text-white bg-red-600 p-[10px] rounded-full hover:text-red-800"
                onClick={
                  ()=> {
                    const tocken = localStorage.getItem("token");
                    if(!tocken){
                      navigate("/login");
                      return;
                    }

                    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/" + product.productId,
                    {
                      headers:{
                        Authorization: `Bearer ${tocken}`
                      }
                    }).then(
                      (res) => {
                        console.log("Product Deleted Successfully");
                        console.log(res.data);
                        toast.success("Product Deleted Successfully");
                        setA(a+1);

                      }
                    ).catch(
                      (err) => {
                        console.error("Error Deleting Product:", err);
                        toast.error("Failed to delete product. Please try again.");
                      }
                    )
                  }
                }>
                  <FaTrashCan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        to={"/admin/newProduct"}
        className="fixed right-[60px] bottom-[60px] p-[20px] rounded-full text-white bg-black shadow-2xl cursor-pointer"
      >
        <ImPlus className="text-2xl" />
      </Link>
    </div>
  );
}
