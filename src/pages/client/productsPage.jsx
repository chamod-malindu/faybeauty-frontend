import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProduactCard from "../../components/productCard";

export default function ProductsPage() {
  const[products, setProduct] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      if(isLoading){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
          (res)=> {
            setProduct(res.data);
            setIsLoading(false);
        })  
      }           
    },
    [isLoading]
  )
  return (
  <div className="w-full min-h-screen bg-primary">
    {
      isLoading ? <Loader /> : 
      <div className="w-full flex flex-wrap items-center justify-center gap-[30px] ">
        {
          products.map(
            (product)=> {
              return(
                    <ProduactCard key={product.productId} product = {product} />   
              )
            })
        }
      </div>
    }
  </div>
  );
}