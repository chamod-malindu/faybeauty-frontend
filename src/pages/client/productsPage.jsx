import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProduactCard from "../../components/productCard";

export default function ProductsPage() {
  const[products, setProduct] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[query, setQuery] = useState("");

  useEffect(
    () => {
      if(isLoading){
        if(query == ""){
          axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
            (res)=> {
              setProduct(res.data);
              setIsLoading(false);
          })  
        }else{
          axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query).then(
            (res)=> {
              setProduct(res.data);
              setIsLoading(false);
          })  
        }    
      }
    },
    [isLoading]
)
  return (
    <div className="w-full min-h-screen bg-primary">
      <div className="w-full mb-[30px] mt-[30px] flex justify-center items-center">
        <input type="text" placeholder="Search Products......." value={query} onChange={
          (e) => {
            setQuery(e.target.value);
            setIsLoading(true);
          }
        }
        className="w-[400px] h-[40px] border-accent border-2 rounded-xl p-2"></input>
      </div>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-wrap items-center justify-center gap-[30px]">
            {products.length > 0 ? (
              products.map((product) => (
                <ProduactCard key={product.productId} product={product} />
              ))
            ) : query ? (
              <p className="text-accent text-lg mt-6">
                No products found for "{query}".
              </p>
            ) : (
              <p className="text-accent text-lg mt-6">
                No products available yet. Please check back later.
              </p>
            )}
          </div>
        )
      }
    </div>
  );
}