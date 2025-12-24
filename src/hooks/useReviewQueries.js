import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReview } from "../services/reviewService";
import toast from "react-hot-toast";


export const REVIEW_KEYS = {
  all: ["reviews"],
};

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, rating, comment }) => {
      const response = await submitReview(productId, rating, comment);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate orders cache (to update "Leave a Review" button status)
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      toast.success("Review submitted successfully");
    },
    onError: (error) => {
      console.error("Failed to submit review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  });

}