import Notice from "@components/dashboard/Notice"
import { NoticeHeight } from "@utils/Scaling"
import React, { FC } from "react"
import { StyleSheet, View, Animated as RNAnimated } from "react-native"

const NOTICE_HEIGHT = -(NoticeHeight + 12)

const NoticeAnimation: FC<{ noticePosition: any; children: React.ReactElement }> = ({
  children,
  noticePosition,
}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[styles.noticeContainer, { transform: [{ translateY: noticePosition }] }]}
      >
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}
      >
        {children}
      </RNAnimated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  noticeContainer: {
    width: "100%",
    zIndex: 999,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default NoticeAnimation
