import api from "../config/axiosConfig";


export function reviewApi(productId, rating, comment) {
  return api.post("/reviews", { productId, rating, comment });
}