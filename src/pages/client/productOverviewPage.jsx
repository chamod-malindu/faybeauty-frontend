import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import { ProductReview } from "../../components/review/productReviews";

export default function ProductOverviewPage() {
  const navigate = useNavigate();
  const params = useParams();
  const[product, setProduct] = useState(null);
  const[status, setStatus] = useState("loading"); // loading, success, error
  const[reviews, setReviews] = useState([]);

  const productId = params.productId;

  useEffect(
    () => {

      if(status == "loading") {
        axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`,
        ).then(
          (res) => {
            setProduct(res.data.product);
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

  useEffect(
    () => {
      axios.get(import.meta.env.VITE_BACKEND_URL+`/api/reviews/${productId}`,
      ).then(
        (res) => {
          console.log(res.data.reviews);
          setReviews(res.data.reviews);
        }
      ).catch(
        (err) => {
          console.log("Failed to fetch reviews.");
        }
      )

    }, [params.productId]
  )

  return(
    <div className="w-full min-h-screen pb-[50px] bg-primary">
      {
        status == "loading" && <Loader />
      }
      {
        status == "success" && (
        <div className="px-[100px]">
          <div className="w-full flex bg-white p-[40px] rounded-xl shadow-xl flex-col md:flex-row relative">
            <div className="md:hidden px-[15px] flex justify-center items-center text-center mb-[20px]">
                <h1 className="text-2xl font-bold">{product.name} {product.altNames && product.altNames.length > 0 && <span className="font-light">{product.altNames.join(" | ")}</span>}
                </h1>
            </div> 
              <div className="w-[full] md:w-[49%] flex flex-col justify-center items-center">
                <ImageSlider images={product.images} /> 
              </div>
              <div className="w-[full] md:w-[49%] h-full flex flex-col justify-center items-center px-[15px] md:px-0">
              <div className="hidden md:block">
                <h1 className="text-3xl font-bold flex flex-col justify-center items-center">{product.name} <span className="font-light text-xl">{product.altNames.join(" | ")}</span>
                </h1>
              </div>
              <p className="text-lg mt-[20px]">{product.description}</p>
              <div className="w-full flex justify-center item-center mt-[20px]">
                {
                  product.labelledPrice > product.price?
                  <div>
                  <span className="text-3xl font-bold mr-[20px]">Rs.{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-2xl font-semibold  line-through">Rs.{product.labelledPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> 
                  </div>
                  :
                  <div>
                      <span className="text-3xl font-bold ">{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                }
              </div>

              <div className="w-full flex flex-row justify-center items-center mt-[20px]  gap-[10px] absolute bottom-[160px]">
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
                  async ()=> {
                    try{
                      await addToCart(product, 1);
                      toast.success("Product added to cart");

                    }catch(error){
                      console.log(error);
                      toast.error("Failed to add product to cart");
                    }
                  }
                }>Add to Cart</button>           
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-secondary my-[40px]">Customer Reviews</h1>
          </div>
          <ProductReview reviews={reviews} />
        </div>
      )
      }
      {
        status == "error" && <div>Product fetching error</div>
      }
    </div>
  )
}