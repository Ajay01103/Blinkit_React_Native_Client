import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import React, { FC } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { useAuthStore } from "@state/authStore"
import { RFValue } from "react-native-responsive-fontsize"
import { navigate } from "@utils/NavigationUtils"
import { CustomText } from "@components/ui/CustomText"
import { Fonts } from "@utils/Constants"

const LiveHeader: FC<{ type: "Customer" | "Delivery"; title: string; secondTitle: string }> = ({
  secondTitle,
  title,
  type,
}) => {
  const isCustomer = type === "Customer"
  const { currentOrder, setCurrentOrder } = useAuthStore()
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (isCustomer) {
              navigate("ProductDashboard")
              if (currentOrder?.status == "delivered") {
                setCurrentOrder(null)
              }
              return
            }

            navigate("DeliveryDashboard")
          }}
        >
          <Icon
            name="chevron-back"
            color={isCustomer ? "white" : "black"}
            size={RFValue(16)}
          />
        </Pressable>

        <CustomText
          variant="h8"
          style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
          fontFamily={Fonts.Medium}
        >
          {title}
        </CustomText>
        <CustomText
          variant="h4"
          style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
        >
          {secondTitle}
        </CustomText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  title: {
    color: "black",
  },
  titleTextWhite: {
    color: "white",
  },
  titleTextBlack: {
    color: "black",
  },
})

export default LiveHeader
