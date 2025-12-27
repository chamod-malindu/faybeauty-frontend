import { changeSiteReview, changeSiteReviewStatus, createSiteReview, deleteSiteReviewApi, getSiteReviews, getUserSiteReviews } from "../api/siteReviewApi";



export async function submitSiteReview(rating, comment) {
    const response = await createSiteReview(rating, comment);
    return response.data;
}

export async function fetchSiteReviews() {
    const response = await getSiteReviews();
    return response.data.siteReviews;
}

export async function fetchUserSiteReviews() {
    const response = await getUserSiteReviews();
    return response.data.siteReviews;
}

export async function updateSiteReview(reviewId, rating, comment) {
    const response = await changeSiteReview(reviewId, rating, comment);
    return response.data.siteReview;
}

export async function updateSiteReviewStatus(reviewId, status) {
    const response = await changeSiteReviewStatus(reviewId, status);
    return response.data.siteReview;
}

export async function deleteSiteReview(reviewId) {
    const response = await deleteSiteReviewApi(reviewId);
    return response.data.message;
}