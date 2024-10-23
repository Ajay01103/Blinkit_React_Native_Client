import { StyleSheet, View } from "react-native"
import React, { FC } from "react"
import { CustomText } from "@components/ui/CustomText"
import { Colors, Fonts } from "@utils/Constants"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RFValue } from "react-native-responsive-fontsize"

const ReportItem: FC<{ iconName: string; underline?: boolean; title: string; price: number }> = ({
  iconName,
  price,
  title,
  underline,
}) => {
  return (
    <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
      <View style={styles.flexRow}>
        <Icon
          name={iconName}
          style={{ opacity: 0.7 }}
          size={RFValue(12)}
          color={Colors.text}
        />
        <CustomText
          variant="h8"
          style={{
            textDecorationLine: underline ? "underline" : "none",
            textDecorationStyle: "dashed",
          }}
        >
          {title}
        </CustomText>
      </View>

      <CustomText variant="h8">₹ {price}</CustomText>
    </View>
  )
}

const BillDetails: FC<{ totalItemPrice: number }> = ({ totalItemPrice }) => {
  return (
    <View style={styles.container}>
      <CustomText
        fontFamily={Fonts.SemiBold}
        style={styles.text}
      >
        Bill Details
      </CustomText>

      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          title="Items Total"
          price={totalItemPrice}
        />
        <ReportItem
          iconName="pedal-bike"
          title="Delivery Charge"
          price={29}
        />
        <ReportItem
          iconName="shopping-bag"
          title="Handling Charge"
          price={3}
        />
        <ReportItem
          iconName="cloudy-snowing"
          title="Surge Charge"
          price={3}
        />
      </View>

      <View style={[styles.flexRowBetween, { marginBottom: 15 }]}>
        <CustomText
          variant="h7"
          style={styles.text}
          fontFamily={Fonts.SemiBold}
        >
          Grand Total
        </CustomText>
        <CustomText
          style={styles.text}
          fontFamily={Fonts.SemiBold}
        >
          ₹ {totalItemPrice + 35}
        </CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
})

export default BillDetails
