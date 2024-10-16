import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { FC, useEffect, useRef } from "react"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { CustomText } from "@components/ui/CustomText"
import { RFValue } from "react-native-responsive-fontsize"
import { Colors } from "@utils/Constants"

interface Props {
  selectedCategory: any
  categories: any
  onCategoryPress: (category: any) => void
}

const Sidebar: FC<Props> = ({ categories, onCategoryPress, selectedCategory }) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const indicatorPosition = useSharedValue(0)
  const animatedValue = categories?.map(() => useSharedValue(0))

  useEffect(() => {
    let targetIndex = -1

    categories?.forEach((category: any, i: number) => {
      const isSelected = selectedCategory?._id === category?._id
      animatedValue[i].value = withTiming(isSelected ? 2 : -15, { duration: 500 })
      if (isSelected) targetIndex = i
    })

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, { duration: 500 })
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        })
      })
    }
  }, [selectedCategory])

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }))
  return (
    <View style={styles.sidebar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        <Animated.View>
          {categories?.map((category: any, i: number) => {
            const animatedStyles = useAnimatedStyle(() => ({
              bottom: animatedValue[i].value,
            }))
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                style={[
                  styles.categoryButton,
                  selectedCategory?.id === category.id && styles.selectedCategoryButton,
                ]}
                onPress={() => onCategoryPress(category)}
              >
                <View
                  style={[
                    styles.imageContainer,
                    selectedCategory?.id === category?._id && styles.selectedImageContainer,
                  ]}
                >
                  <Animated.Image
                    source={{ uri: category?.image }}
                    style={[styles.image, animatedStyles]}
                  />
                </View>

                <CustomText
                  fontSize={RFValue(7)}
                  style={{ textAlign: "center" }}
                >
                  {category?.name}
                </CustomText>
              </TouchableOpacity>
            )
          })}
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    width: "20%",
    backgroundColor: "#fff",
    borderRightWidth: 0.8,
    borderRightColor: "#eee",
    position: "relative",
  },
  categoryButton: {
    padding: 10,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  selectedCategoryButton: {
    backgroundColor: "#CFFFDB",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  imageContainer: {
    borderRadius: 100,
    height: 80,
    marginBottom: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F7",
    overflow: "hidden",
  },
  selectedImageContainer: {
    backgroundColor: "#CFFFDB",
  },
  indicator: {
    position: "absolute",
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
})

export default Sidebar
