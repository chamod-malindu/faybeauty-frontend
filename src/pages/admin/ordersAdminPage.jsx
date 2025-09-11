import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Paginator from "../../components/paginator";
import { MdClose } from "react-icons/md";

export default function OrdersAdminPage(){
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [popupVisible, setPopupVisible] = useState(false);
  const [clickedOrder, setClickedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/login");
    }
    if(isLoading){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders/"+page+"/"+limit,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        }

      }).then(
        (res) => {
          setOrders(res.data.orders);
          setTotalPages(res.data.totalPages);
          console.log(res.data)
          setIsLoading(false);
        }
      ).catch(
        (err) => {
          console.error(err);

        }
      )
    }
  },[isLoading, page, limit]);

  return(
    <div className="w-full h-full flex flex-col justify-between">
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
                  <tr key={index} className="border-b-[1px] hover:bg-blue-400 cursor-pointer" onClick={
                    () => {
                      setClickedOrder(order);
                      setPopupVisible(true);
                      
                    }
                  }>
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

      {
        popupVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center">
            <div className="w-[700px] h-[700px] bg-white rounded-2xl relative p-6 flex flex-col">

              {/* Order Header */}
              <h2 className="text-xl font-bold mb-2">Order ID: {clickedOrder.orderId}</h2>
              <p><b>Name:</b> {clickedOrder.name}</p>
              <p><b>Email:</b> {clickedOrder.email}</p>
              <p><b>Address:</b> {clickedOrder.address}</p>
              <p><b>Phone:</b> {clickedOrder.phone}</p>
              <p className="my-[5px] py-[3px] flex flex-row">
                <b>Status:</b>{" "}
                <span
                  className={`px-[3px] py-[3px] ml-[3px] rounded-md text-white ${
                    clickedOrder.status === "Pending"
                      ? "bg-yellow-500"
                      : clickedOrder.status === "Completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } flex justify-center items-center w-[100px]`}
                >
                  {clickedOrder.status}
                </span>
              </p>
              <p><b>Date:</b> {new Date(clickedOrder.date).toLocaleString()}</p>
              <p><b>Note:</b> {clickedOrder.note}</p>

              {/* Items Section */}
              <div className="mt-4 flex-1">
                <h3 className="text-lg font-semibold mb-2">Items</h3>

                {/* Scrollable items box */}
                <div className="max-h-[180px] overflow-y-auto space-y-3 pr-2">
                  {clickedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          Price: {item.price} × {item.quantity}
                        </span>
                        <span className="font-bold">
                          Subtotal: {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 text-lg font-bold text-right">
                Total: {clickedOrder.total.toLocaleString()} LKR
              </div>

              {/* Close Button */}
              <button
                className="absolute w-[30px] h-[30px] top-[-25px] right-[-25px] bg-red-500 border-[2px] border-red-500 
                          text-white rounded-full cursor-pointer hover:bg-transparent hover:text-red-500 
                          flex justify-center items-center"
                onClick={() => setPopupVisible(false)}
              >
                <MdClose className="font-semibold"/>
              </button>
            </div>
          </div>
        )
      }




      <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setIsLoading}/>
    </div>
  )
}