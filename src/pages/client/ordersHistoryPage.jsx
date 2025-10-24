import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";

export default function OrdersHistoryPage() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState({});
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [orderCount, setOrderCount] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/login");
    }

    if(isLoading){
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/"+page+ "/"+ limit, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }

    }).then((res) => {
      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
      setOrderCount(res.data.orderCount);
      console.log(res.data);
      setIsLoading(false);
      console.log(page);
      console.log(res.data.totalPages);
      console.log(limit);

    }).catch((err) => {
      console.error(err);
      isLoading(false);
    });

    }
    
  }, [isLoading, page]);

  return(
    <div className="w-full min-h-screen flex flex-col items-center bg-primary pb-17 pt-5 px-4 relative">
      {!isLoading ? 
        (<div className="w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-secondary mb-2">Order History</h1>
            <p className="text-secondary">Track and manage all your orders in one place</p>
          </div>
          {orders.map((order, index) => {
          return (
              <div key={index} className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
                {/* Order Header */}
                <div className="flex items-center justify-between w-full p-6 border-b border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-semibold text-xl text-secondary">{order.orderId}</h2> 
                      {order.status === "Completed" ? 
                        (<span className="flex items-center gap-1.5 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <IoMdCheckmarkCircleOutline className="text-[20px]" />
                        Delivered
                         </span>) : order.status === "Pending" ? (
                          <span className="flex items-center gap-1.5 text-sm font-medium text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full">
                          <TbTruckDelivery className="text-[20px]" />
                          Pending
                        </span>
                         ) : (<span className="flex items-center gap-1.5 text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full">
                         <MdOutlineWatchLater className="text-[20px]" />
                         Cancel
                       </span>)}
                    </div>
                    <p className="text-sm text-secondary/60">Ordered on {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-accent">Rs.{order.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</h2>
                    <button 
                      onClick={() => setIsExpanded(
                        prev => ({
                          ...prev,
                          [order.orderId]: !prev[order.orderId] // undifined -> !undefined = true or true -> !true = false
                        })
                      )}
                      className="text-secondary/40 hover:text-secondary transition-colors"
                    >
                      <RiArrowDropDownLine className={`text-[50px] transition-transform ${isExpanded[order.orderId] ? "rotate-180" : ""} hover:text-secondary hover:cursor-pointer`} />
                    </button>
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded[order.orderId] && (
                  <div className="px-6 pb-6 pt-4 border-t-2 border-accent-hover">
                    <h3 className="font-semibold text-lg text-secondary mb-4">Items</h3>
                    
                    {/* Items List */}
                    {order.items.map((item, index) => {
                      return(
                          <div key={index} className="space-y-4 mb-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                              <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0"/>
                                <div>
                                  <h4 className="font-medium text-secondary mb-1">{item.name}</h4>
                                  <span className="text-sm text-secondary/60">Qty: {item.quantity}</span>
                                </div>
                              </div>
                              <p className="font-semibold text-secondary">Rs.{item.quantity * item.price}</p>
                            </div>
                          </div>
                      )
                    })}

                        {/* Delivery Info */}
                        <div className="flex justify-between border-t-2 border-accent-hover gap-6 pt-5 mb-6">
                          <div className="flex-1">
                            <h4 className="font-semibold text-secondary mb-2">Delivery Address</h4>
                            <p className="text-sm text-secondary/70">{order.address}</p>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-secondary mb-2">Estimated Delivery</h4>
                            <p className="text-sm text-secondary/70">{new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                          {order.status === "Pending" ? 
                           (
                            <button className="flex-1 bg-red-500 border-2 border-gray-200 text-white font-medium py-3 rounded-lg hover:bg-gray-50 hover:border-red-500 hover:text-red-500 hover:cursor-pointer transition-colors">
                            Cancel Order
                            </button>
                           ) : (
                            // Review Button
                            <button className="flex-1 bg-accent border-2 border-gray-200 text-white font-medium py-3 rounded-lg hover:bg-gray-50 hover:border-accent hover:text-accent hover:cursor-pointer transition-colors"
                            onClick={() => setPopupVisible(true)}>
                            Leave a Review
                            </button>
                           )
                          }

                          {/* Review popup */}
                          {
                            popupVisible && (
                              <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
                                <div className="w-[400px] bg-white rounded-2xl p-6 relative">
                                  {/* Close button */}
                                  <button 
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                                    onClick={ () => setPopupVisible(false)}
                                  >
                                    ×
                                  </button>

                                  {/* Header */}
                                  <div className="mb-5">
                                    <h2 className="text-xl font-bold text-gray-800">Rate & Review</h2>
                                    <h3 className="text-sm text-gray-500">Share your experience with this order</h3>
                                  </div>

                                  {/* Rating */}
                                  <div className="mb-3">
                                    <h2 className="text-sm font-semibold text-gray-700 mb-1">Rating</h2>
                                    <div className="flex gap-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          className="text-4xl focus:outline-none transition-colors"
                                        >
                                          <span className="text-gray-300">☆</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Your Review */}
                                  <div className="mb-6">
                                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Your Review</h2>
                                    <textarea 
                                      placeholder="Share your thoughts about this order..."
                                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm h-24 resize-none focus:outline-none focus:border-purple-500"
                                    />
                                  </div>

                                  {/* Buttons */}
                                  <div className="flex gap-3">
                                    <button 
                                      className="flex-1 border-2 border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-200 transition- hover:cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                    <button 
                                      className="flex-1 bg-accent-hover text-white font-medium py-2 rounded-lg border-2 hover:bg-white hover:text-accent-hover hover:border-2 hover:border-accent-hover transition-colors hover:cursor-pointer"
                                    >
                                      Submit Review
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          <button className="flex-1 bg-white border-2 border-gray-200 text-secondary font-medium py-3 rounded-lg hover:bg-gray-300 hover:cursor-pointer hover:text-white transition-colors">
                            Contact Support
                          </button>
                        </div>
                  </div>
                )}
              </div>
            
            )
          })
        
        }

        {/* Paginator */}
        <div className="flex w-4xl items-center justify-between absolute bottom-0 rounded-lg p-4 mt-6">
          <div className="text-sm text-gray-600">
            Showing {((page - 1) * limit) + 1} to {Math.min(((page - 1) + limit), orderCount)} of {orderCount} orders
          </div>
          <div className="flex items-center justify-center  w-[250px] rounded-xl h-[50px] shadow-2xl gap-4">
            <button
              onClick={() => {
                setPage(prev => Math.max(1, prev - 1));
                setIsLoading(true);
              }}
              disabled={page === 1}
              className="text-gray-600 shadow-2xl hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span>❮</span> Previous
            </button>
            <span className="text-sm text-gray-700 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => {
                setPage(prev => Math.min(totalPages, prev + 1));
                setIsLoading(true);
              }}
              disabled={page === totalPages}
              className="text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next <span>❯</span>
            </button>
          </div>
        </div>
        </div>) : (<Loader />)
      }
    </div>
  )
}