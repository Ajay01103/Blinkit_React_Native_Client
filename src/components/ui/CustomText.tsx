import React, { memo } from "react"
import { Text, TextStyle, StyleSheet, LayoutChangeEvent } from "react-native"
import { Colors, Fonts } from "@utils/Constants"
import { RFValue } from "react-native-responsive-fontsize"

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body"

interface Props {
  variant?: TextVariant
  fontFamily?: Fonts
  fontSize?: number
  style?: TextStyle | TextStyle[]
  children?: React.ReactNode
  numberOfLines?: number
  onLayout?: (event: LayoutChangeEvent) => void
}

const variantSizes: Record<TextVariant, number> = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
  h7: 12,
  h8: 10,
  h9: 9,
  body: 12,
}

const CustomTextComponent: React.FC<Props> = ({
  variant = "body",
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  const computedFontSize = RFValue(fontSize || variantSizes[variant])

  return (
    <Text
      onLayout={onLayout}
      style={[styles.text, { fontFamily, fontSize: computedFontSize }, style]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    color: Colors.text,
  },
})

const MemoizedCustomText = memo(CustomTextComponent)

// This is the default export, which allows existing imports to work without changes
export default MemoizedCustomText

// We also provide a named export for those who prefer it
export { MemoizedCustomText as CustomText }
