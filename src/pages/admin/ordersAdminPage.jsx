import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OrdersAdminPage(){
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/login");
    }
    if(isLoading){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders",
      {
        headers: {
            Authorization: `Bearer ${token}`,
        }

      }).then(
        (res) => {
          setOrders(res.data);
          console.log(res.data)
          setIsLoading(false);
        }
      ).catch(
        (err) => {
          console.error(err);

        }
      )
    }
  },[isLoading]);

  return(
    <div className="w-full h-full">
      <table className="w-full border-[3px]">
        <thead>
          <tr>
            <th className="p-[10px]">Order ID</th>
						<th className="p-[10px]">Email</th>
						<th className="p-[10px]">Name</th>
						<th className="p-[10px]">Address</th>
						<th className="p-[10px]">Phone</th>
						<th className="p-[10px]">Status</th>
						<th className="p-[10px]">Date</th>
						<th className="p-[10px]">Total</th>
          </tr>
        </thead>
        <tbody>
            {
              orders.map((order, index) => {
                return(
                  <tr key={index} className="border-b-[1px]">
                    <td className="p-[10px]">{order.orderId}</td>
                    <td className="p-[10px]">{order.email}</td>
                    <td className="p-[10px]">{order.name}</td>
                    <td className="p-[10px]">{order.address}</td>
                    <td className="p-[10px]">{order.phone}</td>
                    <td className="p-[10px]">{order.status}</td>
                    <td className="p-[10px]">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="p-[10px] text-end">
                      {order.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}