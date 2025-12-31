import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { cache, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";
import ReviewPopup from "../../components/review/reviewPopup";
import toast from "react-hot-toast";
import CancelOrderModal from "../../components/CancelOrderModal";

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

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewSent, setReviewSent] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);


  const token = localStorage.getItem("token");

  useEffect(() => {

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
      setIsLoading(false);
    });

    }
    
  }, [isLoading, page]);

  async function handleSubmitReview(rating, comment) {
    try{
      console.log("selectedItem:", selectedItem);

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/reviews", {
        productId: selectedItem.productId,
        rating: rating,
        comment: comment,

      },{
          headers: {
                Authorization: `Bearer ${token}`,
            } 
      }).then((res) => {
        console.log("Review submitted successfully:", res.data);
        toast.success("Review submitted successfully!");
        setPopupVisible(false);
        setReviewSent(true);
        setRating(0);
        setComment("");

      }).catch((err) => {
        console.error("Failed to submit review:", err);
        toast.error("Failed to submit review.");
      });


    }catch(error){
      console.error("Failed to submit review:", error);
    }
  }

  const handleCancelOrder = async (orderId, reason) => {
    try {
      if (!reason || reason.trim() === "") {
        toast.error("Please provide a cancel reason");
        return;
      }

      console.log("Cancelling order:", orderId, "Reason:", reason);
      await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/orders/cancel/${orderId}`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order cancelled successfully");

      setShowCancelModal(false);
      setCancelingOrderId(null);setIsLoading(true);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  };          


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
                              <div className="flex flex-col items-end">
                                <p className="font-semibold text-secondary">Rs.{item.quantity * item.price}</p>
                                <button className={`${order.status === "Pending" || order.status === "Cancelled" ? "hidden" : "font-bold text-accent-hover hover:text-accent cursor-pointer" }`}
                                onClick={() => {
                                  setPopupVisible(true);
                                  setSelectedItem(item);
                                }}
                                >
                                  {!reviewSent ? "Leave a Review" : "Review Sent"}
                                </button>
                              </div>
                            </div>
                          </div>        
                      )
                    })}

                    {/* Review popup */}
                      {
                        popupVisible && selectedItem &&(
                          <ReviewPopup item={selectedItem} onClose={ () => setPopupVisible(false) } rating={rating} setRating={setRating} comment={comment} setComment={setComment} handleSubmitReview={handleSubmitReview} index={index} />
                        )
                      }

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
                          <button 
                          disabled={order.status !== "Pending"}
                          className={`flex-1 bg-red-500 border-2 border-gray-200 text-white font-medium py-3 rounded-lg   ${order.status !== "Pending" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 hover:border-red-500 hover:text-red-500 hover:cursor-pointer"}  transition-colors`}
                          onClick={() => {
                            setCancelingOrderId(order.orderId);
                            setShowCancelModal(true);
                          }}
                          >
                          Cancel Order
                          </button>
                           
                          
                          <button className="flex-1 bg-white border-2 border-gray-200 text-secondary font-medium py-3 rounded-lg hover:bg-gray-300 hover:cursor-pointer hover:text-white transition-colors"
                            onClick={() => {navigate("/contactUs")}}
                          >
                            Contact Support
                          </button>
                        </div>

                        {/* Cancel Order Modal */}
                        {showCancelModal && (
                          <CancelOrderModal
                            isOpen={showCancelModal}
                            onClose={() => setShowCancelModal(false)}
                            orderId={cancelingOrderId}
                            onSubmit={handleCancelOrder}
                          />
                        )}
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