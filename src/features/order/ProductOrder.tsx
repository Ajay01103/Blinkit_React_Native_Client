import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import React, { FC, useState } from "react"
import CustomHeader from "@components/ui/CustomHeader"
import { Colors, Fonts } from "@utils/Constants"
import OrderList from "./OrderList"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { RFValue } from "react-native-responsive-fontsize"
import { CustomText } from "@components/ui/CustomText"
import { useCartStore } from "@state/cartStore"
import BillDetails from "./BillDetails"
import { hocStyles } from "@styles/globalStyles"
import { useAuthStore } from "@state/authStore"
import ArrowButton from "@components/ui/ArrowButton"
import { navigate } from "@utils/NavigationUtils"
import { createOrder } from "@service/OrderService"

const ProductOrder: FC = () => {
  const { getTotalPrice, cart, clearCart } = useCartStore()
  const totalItemPrice = getTotalPrice()

  const [loading, setLoading] = useState(false)

  const { user, setCurrentOrder, currentOrder } = useAuthStore()

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
      Alert.alert("Let your first order to be delivered")
      return
    }

    const formatedData = cart.map((item) => ({
      id: item._id,
      items: item.item,
      count: item.count,
    }))

    if (formatedData.length === 0) {
      Alert.alert("Add some items to place orders")
      return
    }

    setLoading(true)
    console.log("Formatted Data:", formatedData)
    console.log("Total Item Price:", totalItemPrice)

    try {
      const data = await createOrder(formatedData, totalItemPrice)
      console.log("Order Creation Response:", data)

      if (data !== null) {
        setCurrentOrder(data)
        navigate("OrderSuccess", { ...data })
        clearCart()
      } else {
        Alert.alert("There was an error")
      }
    } catch (error) {
      console.error("Error creating order:", error)
      Alert.alert("There was an error")
    }

    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <OrderList />

        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require("@assets/icons/coupon.png")}
              style={{ width: 25, height: 25 }}
            />

            <CustomText
              variant="h6"
              fontFamily={Fonts.SemiBold}
            >
              Use Coupons
            </CustomText>
          </View>

          <Icon
            name="chevron-right"
            size={RFValue(16)}
            color={Colors.text}
          />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />

        <View style={styles.flexRowBetween}>
          <View>
            <CustomText
              variant="h8"
              fontFamily={Fonts.SemiBold}
            >
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}
            >
              Orders cannot be cancelled once packed for delivery, in case of unexpected delays, a
              refund will be provided
            </CustomText>
          </View>
        </View>
      </ScrollView>

      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require("@assets/icons/home.png")}
                style={{ width: 20, height: 20 }}
              />

              <View style={{ width: "75%" }}>
                <CustomText
                  variant="h8"
                  fontFamily={Fonts.Medium}
                >
                  Delivering to Home
                </CustomText>
                <CustomText
                  variant="h9"
                  numberOfLines={2}
                  style={{ opacity: 0.6 }}
                >
                  {user?.address}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity>
              <CustomText
                variant="h9"
                fontFamily={Fonts.Medium}
                style={{ color: Colors.secondary }}
              >
                Change
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentGateway}>
            <View style={{ width: "30%" }}>
              <CustomText
                fontFamily={Fonts.Regular}
                fontSize={RFValue(6)}
              >
                💸 Pay Using
              </CustomText>
              <CustomText
                fontFamily={Fonts.Regular}
                variant="h9"
                style={{ marginTop: 2 }}
              >
                Cash on Delivery
              </CustomText>
            </View>

            <View style={{ width: "70%" }}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title="Place Order"
                onPress={handlePlaceOrder}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === "ios" ? 30 : 10, //prev value was 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  flexRowBetween: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    borderRadius: 15,
  },
  flexRow: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  addressContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  paymentGateway: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
  },
})

export default ProductOrder
