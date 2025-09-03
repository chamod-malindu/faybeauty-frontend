import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";

export default function ProductOverviewPage() {
  const params = useParams();
  const[product, setProduct] = useState(null);
  const[status, setStatus] = useState("loading"); // loading, success, error

  useEffect(
    () => {
      if(status == "loading") {
        axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${params.productId}`).then(
          (res) => {
            setProduct(res.data);
            setStatus("success");
          }
        ).catch(
          (err) => {
            setStatus("error");
            toast.error("Failed to fetch product details.");
          }
        )
      }
    }, [status]
    )
  return(
    <div className="w-full h-screen">
      {
        status == "loading" && <Loader />
      }
      {
        status == "success" && <div className="w-full h-full flex flex-row"> 
          <div className="w-[49%] h-full flex flex-col justify-center items-center">
            <ImageSlider images={product.images} /> 
          </div>
          <div className="w-[49%] h-full bg-red-600">

          </div>
        </div>
      }
      {
        status == "error" && <div>Product fetching error</div>
      }
    </div>
  )
}