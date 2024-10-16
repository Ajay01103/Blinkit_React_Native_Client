import axios from "axios"
import { BASE_URL } from "./config"

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`)
    return response.data
  } catch (error) {
    console.log("[CATEGORY_FETCH_ERROR]", error)
    return []
  }
}

export const getProductsByCategoryId = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`)
    return response.data
  } catch (error) {
    console.log("[CATEGORY_BY_PRODUCT_FETCH_ERROR]", error)
    return []
  }
}
