import { deleteReviewApi, getReviewsApi, getUserReviewsApi, reviewApi, updateReviewApi } from "../api/reviewApi"


export async function submitReview(productId, rating, comment) {
  try {
    const response = await reviewApi(productId, rating, comment);
    return response;

  }catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
  
}

export async function fetchProductReviews(productId) {
  try {
    const response = await getReviewsApi(productId);
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    throw error;
  }
}

export async function fetchUserReviews() {
  try {
    const response = await getUserReviewsApi();
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
}

export async function updateReview(reviewId, rating, comment) {
  try {
    const response = await updateReviewApi(reviewId, rating, comment);
    return response.data.review;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}

export async function deleteReview(reviewId) {
  try {
    const response = await deleteReviewApi(reviewId);
    return response.data.message;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}