import { Image, ScrollView, StyleSheet, View } from "react-native"
import React, { FC, useEffect } from "react"
import { useAuthStore } from "@state/authStore"
import { getOrderById } from "@service/OrderService"
import { Colors } from "@utils/Constants"
import LiveHeader from "./LiveHeader"

const LiveTracking: FC = () => {
  const { currentOrder, setCurrentOrder } = useAuthStore()

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any)
    setCurrentOrder(data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  let msg = "Packing your order"
  let time = "Arriving in 10 minutes"

  if (currentOrder?.status === "confirmed") {
    msg = "Arriving soon"
    time = "Arriving in 8 minutes"
  } else if (currentOrder?.status === "arriving") {
    ;(msg = "Order Picking Up"), (time = "Arriving in 6 minutes")
  } else if (currentOrder?.status === "delivered") {
    ;(msg = "Order Delivered"), (time = "Fastest Delivery ⚡")
  }

  return (
    <View style={styles.container}>
      <LiveHeader
        type="Customer"
        title={msg}
        secondTitle={time}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={require("@assets/images/map.jpg")}
          style={{ width: "100%" }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
})

export default LiveTracking
