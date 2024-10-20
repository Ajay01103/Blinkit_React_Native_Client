import { useCartStore } from "@state/cartStore"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import CartAnimationWrapper from "./CartAnimationWrapper"
import CartSummary from "./CartSummary"

const WithCart = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {
  const WithCardComponent: FC<P> = (props) => {
    const cart = useCartStore((state) => state.cart) || []
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0)

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />

        <CartAnimationWrapper cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.image || null}
          />
        </CartAnimationWrapper>
      </View>
    )
  }

  return WithCardComponent
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default WithCart
