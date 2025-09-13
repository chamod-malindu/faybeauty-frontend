import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart"
import { FaPlus } from "react-icons/fa6";
import { HiMiniMinus } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function CartPage(){
  const[cart, setCart] = useState(getCart());
  const navigate= useNavigate();

  console.log(cart);
  return(
    <div className="w-full h-full flex flex-col bg-primary items-center gap-[30px] my-[20px] text-secondary">
      {
        cart.map(
          (item) => {
            return(
              <div key={item.productId} className="w-[800px] h-[100px] flex flex-row shadow-2xl rounded-2xl">
                 {/* Image */}
                <div className="w-[100px] rounded-l-2xl overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover" />
                </div>

                {/* Name and Price */}
                <div className="w-[300px] flex flex-col p-[15px] justify-center">
                  <span className="font-bold">{item.name}</span>
                  <span className="font-semibold">{item.price.toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}</span>
                </div>

                {/* Quantity */}
                <div className="w-[200px] flex flex-row items-center justify-center gap-[15px]">
                  <button className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-accent-hover" onClick={
                    () => {
                      addToCart(item, 1);
                      setCart(getCart());
                    }
                  }>
                    <FaPlus className="font-semibold"/>
                  </button>
                  <span className="font-semibold flex justify-center items-center ">
                    {item.quantity}
                  </span>
                  <button className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-accent-hover" onClick={
                    () => {
                      addToCart(item, -1);
                      setCart(getCart());
                    }
                  }>
                    <HiMiniMinus className="font-semibold"/>
                  </button>
                </div>

                {/* Toatal */}
                <div className="w-[200px] flex justify-end items-center pr-[20px]">
                  <span className="font-semibold text-xl">
                    {(item.quantity * item.price).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* Remove Button */}
                <div className="relative flex justify-center items-center">
                  <button className="w-[30px] h-[30px] rounded-full bg-red-500 flex justify-center items-center absolute right-[-40px] border-red-500 border-[2px] text-white hover:bg-white cursor-pointer hover:text-red-500" onClick={
                            ()=>{
                                addToCart(item, -item.quantity);
                                setCart(getCart());
                            }
                        }>
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            )
            
          }
        )
      }
      <div className="w-[800px] h-[100px] flex flex-row justify-end items-center shadow-2xl  rounded-2xl relative">
        <span className="font-bold text-2xl pr-[20px]">
          Total: {getTotal().toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
        </span>
        <button className="bg-accent w-[150px] h-[50px] rounded-2xl font-semibold text-white  border-accent border-[2px] left-[20px] hover:bg-white hover:text-accent absolute" onClick={
          ()=> {
            navigate("/checkout", {
              state: {items: cart}
            });
          }
        }>
          Checkout
        </button>

      </div>
    </div>
  )
}