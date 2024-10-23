import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native"
import React, { FC } from "react"
import { Colors, Fonts } from "@utils/Constants"
import { CustomText } from "./CustomText"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RFValue } from "react-native-responsive-fontsize"

interface Props {
  title?: string
  onPress?: () => void
  price?: number
  loading?: boolean
}

const ArrowButton: FC<Props> = ({ loading, onPress, price, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[styles.btn, { justifyContent: price !== 0 ? "space-between" : "center" }]}
    >
      {price !== 0 && price && (
        <View>
          <CustomText
            variant="h7"
            fontFamily={Fonts.Medium}
            style={{ color: "#fff" }}
          >
            ₹ {price + 35}.0
          </CustomText>

          <CustomText
            variant="h9"
            fontFamily={Fonts.Medium}
            style={{ color: "white" }}
          >
            TOTAL
          </CustomText>
        </View>
      )}

      <View style={styles.flexRow}>
        <CustomText
          variant="h6"
          style={{ color: "#fff" }}
          fontFamily={Fonts.Medium}
        >
          {title}
        </CustomText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginHorizontal: 5 }}
          />
        ) : (
          <Icon
            name="arrow-right"
            size={RFValue(25)}
            color="#fff"
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ArrowButton
