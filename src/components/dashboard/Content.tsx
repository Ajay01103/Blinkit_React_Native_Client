import { StyleSheet, Text, View } from "react-native"
import React, { FC } from "react"
import { adData, categories } from "@utils/dummyData"
import AdCarousel from "./AdCarousel"
import CustomText from "@components/ui/CustomText"
import { Fonts } from "@utils/Constants"
import CategoryContainer from "./categoryContainer"

const Content: FC = () => {
  return (
    <View style={styles.container}>
      <AdCarousel adData={adData} />
      <CustomText
        variant="h5"
        fontFamily={Fonts.SemiBold}
      >
        Grocery & Kitchen
      </CustomText>

      <CategoryContainer data={categories} />
      <CustomText
        variant="h5"
        fontFamily={Fonts.SemiBold}
      >
        Frequently Bought
      </CustomText>

      <CategoryContainer data={categories} />
      <CustomText
        variant="h5"
        fontFamily={Fonts.SemiBold}
      >
        Snacks & Drinks
      </CustomText>

      <CategoryContainer data={categories} />
      <CustomText
        variant="h5"
        fontFamily={Fonts.SemiBold}
      >
        Home & Lifestyle
      </CustomText>

      <CategoryContainer data={categories} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
})

export default Content
