import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import SplashScreen from "@features/auth/SplashScreen"
import { NavigationRef } from "@utils/NavigationUtils"
import DeliveryLogin from "@features/auth/DeliveryLogin"
import CustomerLogin from "@features/auth/CustomerLogin"
import ProductDashboard from "@features/dashboard/productDashboard"
import DeliveryDashboard from "@features/delivery/DeliveryDashboard"
import ProductCategories from "@features/category/ProductCategories"
import ProductOrder from "@features/order/ProductOrder"
import OrderSuccess from "@features/order/OrderSuccess"
import LiveTracking from "@features/liveTacking/LiveTracking"

const Stack = createNativeStackNavigator()

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SplashScren"
          component={SplashScreen}
        />
        <Stack.Screen
          name="ProductDashboard"
          component={ProductDashboard}
        />
        <Stack.Screen
          name="ProductCategories"
          component={ProductCategories}
        />
        <Stack.Screen
          name="DeliveryDashboard"
          component={DeliveryDashboard}
        />
        <Stack.Screen
          name="ProductOrder"
          component={ProductOrder}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
        />
        <Stack.Screen
          name="LiveTracking"
          component={LiveTracking}
        />
        <Stack.Screen
          options={{
            animation: "fade",
          }}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
        <Stack.Screen
          options={{
            animation: "fade",
          }}
          name="CustomerLogin"
          component={CustomerLogin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
