import { reviewApi } from "../api/reviewApi"


export async function submitReview(productId, rating, comment) {
  try {
    const response = await reviewApi(productId, rating, comment);
    return response;

  }catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
  
}