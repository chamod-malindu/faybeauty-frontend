import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
  const navigate = useNavigate();
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
    <div className="w-full h-full bg-primary">
      {
        status == "loading" && <Loader />
      }
      {
        status == "success" && <div className="w-full flex flex-col md:flex-row">
          <div className="md:hidden px-[15px] flex justify-center items-center text-center mb-[20px]">
              <h1 className="text-2xl font-bold">{product.name} <span className="font-light">{product.altNames.join(" | ")}</span>
              </h1>
            </div> 
          <div className="w-[full] md:w-[49%] flex flex-col justify-center items-center">
            <ImageSlider images={product.images} /> 
          </div>
          <div className="w-[full] md:w-[49%] h-full flex flex-col justify-center items-center px-[15px] md:px-0">
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold">{product.name} <span className="font-light">{product.altNames.join(" | ")}</span>
              </h1>
            </div>
            <p className="text-lg mt-[20px]">{product.description}</p>
            <div className="w-full flex justify-center item-center mt-[20px]">
              {
                product.labelledPrice > product.price?
                <div>
                <span className="text-2xl font-semibold  line-through mr-[20px]">{product.labelledPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> 
                <span className="text-3xl font-bold ">{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                :
                <div>
                    <span className="text-3xl font-bold ">{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              }
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-[20px]  gap-[10px]">
              <button className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-accent border-[3px] border-accent hover:bg-white hover:text-accent" onClick={
                () => {
                  navigate("/checkout", 
                    {
                      state: { items: 
                        [{
                            productId: product.productId,
                            quantity: 1,
                            name: product.name,
                            image: product.images[0],
                            price: product.price
                        }]
                     }
                    });
                }
              }>Buy Now</button>
              <button className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-accent-hover border-[3px] border-accent-hover hover:bg-white hover:text-accent-hover" onClick={
                ()=> {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }
              }>Add to Cart</button>
            </div>
          </div>
        </div>
      }
      {
        status == "error" && <div>Product fetching error</div>
      }
    </div>
  )
}