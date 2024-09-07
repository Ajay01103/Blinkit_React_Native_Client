import { ViewStyle, SafeAreaView, StyleSheet, View } from "react-native"
import React, { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  style?: ViewStyle
}

const CustomSafeAreaView: FC<Props> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default CustomSafeAreaView
