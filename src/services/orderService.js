import { fetchOrders } from "../api/ordersApi";


export async function getOrders(page, limit) {
  try {
    const response = await fetchOrders(page,limit);
    return response.data;
  } catch (error) {
    throw error;
  }
}