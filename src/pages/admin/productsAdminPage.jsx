import { ImPlus } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
  const[products, setProducts] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(
      () => {
      if(isLoading){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products",
        ).then(
          (res) => {
            console.log(res.data);
            console.log(res.data.products);
            setProducts(res.data.products);
            setIsLoading(false);
          }
          )
      }
    },
    [isLoading]
  )
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full p-4">
      {isLoading?<Loader /> 
      : (<table className="w-full border-collapse border border-gray-300 text-left">
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
              <td className="p-4 border border-gray-300 flex justify-center items-center gap-2">
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
                        setIsLoading(!isLoading);

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
                <button className="text-white bg-blue-500 p-[10px] rounded-full hover:text-blue-800"
                  onClick={
                    () => {
                      navigate("/admin/updateProduct", {
                        state: product
                      });
                    }
                  }
                >
                  <FaRegEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)
      }
      <Link
        to={"/admin/newProduct"}
        className="fixed right-[60px] bottom-[60px] p-[20px] rounded-full text-white bg-black shadow-2xl cursor-pointer"
      >
        <ImPlus className="text-2xl" />
      </Link>
    </div>
  );
}
