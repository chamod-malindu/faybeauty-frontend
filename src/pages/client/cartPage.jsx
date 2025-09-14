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
    <div className="w-full h-full flex flex-col bg-primary items-center gap-[20px] md:gap-[30px] my-[20px] text-secondary px-[15px] md:px-0">
      {
        cart.map(
          (item) => {
            return(
              <div key={item.productId} className="w-full max-w-[800px] min-h-[120px] md:h-[100px] flex flex-col md:flex-row shadow-2xl rounded-2xl bg-white">
                
                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col">
                  {/* Top Row */}
                  <div className="flex flex-row">
                    {/* Image */}
                    <div className="w-[100px] h-[100px] flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Name, Price and Remove Button */}
                    <div className="flex-1 flex flex-col justify-center p-[15px] relative">
                      <span className="font-bold text-[23px]">{item.name}</span>
                      <span className="font-semibold text-[18px] text-gray-600">
                        Rs:{item.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      
                      {/* Remove Button */}
                      <button 
                        className="absolute top-[10px] right-[10px] w-[25px] h-[25px] rounded-full bg-red-500 flex justify-center items-center border-red-500 border-[2px] text-white hover:bg-white cursor-pointer hover:text-red-500" 
                        onClick={() => {
                          addToCart(item, -item.quantity);
                          setCart(getCart());
                        }}
                      >
                        <FaRegTrashCan className="text-xs" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex flex-row justify-between items-center p-[15px] pt-0 border-t border-gray-100">
                    {/* Quantity Controls */}
                    <div className="flex flex-row items-center gap-[10px] mt-[15px]">
                      <button 
                        className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-accent-hover text-white" 
                        onClick={() => {
                          addToCart(item, -1);
                          setCart(getCart());
                        }}
                      >
                        <HiMiniMinus className="font-semibold"/>
                      </button>
                      
                      <span className="font-semibold text-lg min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      
                      <button 
                        className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-accent-hover text-white" 
                        onClick={() => {
                          addToCart(item, 1);
                          setCart(getCart());
                        }}
                      >
                        <FaPlus className="font-semibold"/>
                      </button>
                    </div>
                    
                    {/* Item Total */}
                    <div className="flex flex-col items-end">
                      <span className="text-[15px] text-gray-500">Total</span>
                      <span className="font-bold text-[20px]">
                        Rs:{(item.quantity * item.price).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex md:flex-row w-full">
                  {/* Image */}
                  <div className="w-[100px] rounded-l-2xl overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>

                  {/* Name and Price */}
                  <div className="w-[300px] flex flex-col p-[15px] justify-center">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-semibold">Rs:{item.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}</span>
                  </div>

                  {/* Quantity */}
                  <div className="w-[200px] flex flex-row items-center justify-center gap-[15px]">
                    <button 
                      className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-accent-hover text-white" 
                      onClick={() => {
                        addToCart(item, 1);
                        setCart(getCart());
                      }}
                    >
                      <FaPlus className="font-semibold"/>
                    </button>
                    <span className="font-semibold flex justify-center items-center ">
                      {item.quantity}
                    </span>
                    <button 
                      className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-accent-hover text-white" 
                      onClick={() => {
                        addToCart(item, -1);
                        setCart(getCart());
                      }}
                    >
                      <HiMiniMinus className="font-semibold"/>
                    </button>
                  </div>

                  {/* Total */}
                  <div className="w-[200px] flex justify-end items-center pr-[20px]">
                    <span className="font-semibold text-xl">
                      Rs:{(item.quantity * item.price).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="relative flex justify-center items-center">
                    <button 
                      className="w-[30px] h-[30px] rounded-full bg-red-500 flex justify-center items-center absolute right-[-40px] border-red-500 border-[2px] text-white hover:bg-white cursor-pointer hover:text-red-500" 
                      onClick={() => {
                        addToCart(item, -item.quantity);
                        setCart(getCart());
                      }}
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        )
      }
      
      {/* Total and Checkout Section */}
      <div className="w-full max-w-[800px] min-h-[80px] md:h-[100px] flex flex-col md:flex-row justify-between md:justify-end items-center shadow-2xl rounded-2xl bg-white p-[20px] relative gap-[15px] md:gap-0">
        
        {/* Checkout Button */}
        <button 
          className="w-full md:w-[150px] h-[50px] bg-accent rounded-2xl font-semibold text-white border-accent border-[2px] hover:bg-white hover:text-accent transition-colors md:absolute md:left-[20px] order-2 md:order-1" 
          onClick={() => {
            navigate("/checkout", {
              state: {items: cart}
            });
          }}
        >
          Checkout
        </button>
        
        {/* Total Amount */}
        <div className="flex flex-col md:flex-row items-center gap-[5px] md:gap-[10px] order-1 md:order-2">
          <span className="text-sm md:hidden text-gray-600">Grand Total:</span>
          <span className="font-bold text-xl md:text-2xl">
            <span className="hidden md:inline">Total: </span>
            Rs:{getTotal().toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}