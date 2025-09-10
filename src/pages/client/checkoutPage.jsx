import { useEffect, useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart"
import { FaPlus } from "react-icons/fa6";
import { HiMiniMinus } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function CheckoutPage(){
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.items || []);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if(!token){
        toast.error("Pleace login befor to checkout");
        navigate("/login");

      }else{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users",
        {
          headers: {
              Authorization: `Bearer ${token}`,
          }

        }).then(
          (res) => {
            setUser(res.data);
            setName(res.data.firstName + " " + res.data.lastName);
            console.log(res.data);
          }
        ).catch(
          (err) => {
            console.error(err);
            toast.error("Failed to fetch user details");
            navigate("/login");
          }
        )
      }
    }, []);

  if (!location.state?.items) {
    toast.error("Please select items to checkout");
    navigate("/products");
    return null; 
  }

  function getTotal() {
    let total = 0;
    cart.forEach(
      (item) => {
        total += item.price * item.quantity;
      }
    )
    return total;
  }

  async function placeOrder() {
		const token = localStorage.getItem("token");
		if (token == null) {
			toast.error("Please login to place an order");
			navigate("/login");
			return;
		}

    const order = {
      address: address,
      phone: phone,
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };


    cart.forEach((item) => {
        order.items.push({
            productId: item.productId,
            quantity: item.quantity
        })
    })

    try{
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        toast.success("Order placed successfully");
        

    }catch(err){
        console.error(err);
        toast.error("Failed to place order");
        return;
    }
	}


  console.log(cart);
  return(
    <div className="w-full h-full flex flex-col items-center gap-[30px] my-[20px]">
      {
        cart.map(
          (item, index) => {
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
                  <button className="bg-blue-500 w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300" onClick={
                    () => {
                      const newCart = [...cart];
                      newCart[index].quantity += 1;
                      setCart(newCart);
                    }
                  }>
                    <FaPlus className="font-semibold"/>
                  </button>
                  <span className="font-semibold flex justify-center items-center ">
                    {item.quantity}
                  </span>
                  <button className="bg-blue-500 w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300" onClick={
                    () => {
                      const newCart = [...cart];
                      newCart[index].quantity -= 1;
                      if (newCart[index].quantity <= 0) {
                        newCart.splice(index, 1);
                      }
                      setCart(newCart);
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
                              const newCart = [...cart];
                              newCart.splice(index, 1);

                              setCart(newCart);
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
        <button className="bg-blue-400 w-[150px] h-[50px] rounded-2xl font-semibold text-white  border-blue-400 border-[2px] left-[20px] hover:bg-white hover:text-blue-400 absolute cursor-pointer" onClick={
          ()=> {
            placeOrder();
          }
        }>
          Place Order
        </button>

      </div>
      <div className="w-[800px] h-[100px] flex flex-row justify-center items-center gap-[10px] shadow-2xl rounded-2xl">
        <input className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] mr-[10px]" 
          type="text"
          placeholder="Endter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <input className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter Youre Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} />
        <input className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} />
      </div>
    </div>
  )
}