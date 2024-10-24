import { appAxios } from "./apiInterceptorsOrders"

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: "66c5a8bc4c2aa531b817fcd8",
      totalPrice: totalPrice,
    })

    return response.data
  } catch (error) {
    console.log("Create Order error", error)
    return null
  }
}

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`)

    return response.data
  } catch (error) {
    console.log("Fetch Order error", error)
    return null
  }
}
