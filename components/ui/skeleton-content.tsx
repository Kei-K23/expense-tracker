import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type LayoutItem = {
  key: string;
  style?: ViewStyle;
};

type SkeletonContentProps = {
  isLoading: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  layout: LayoutItem[];
  children: React.ReactNode;
};

export default function SkeletonContent({
  isLoading,
  containerStyle,
  layout,
  children,
}: SkeletonContentProps) {
  const translateX = useSharedValue(-1000);

  translateX.value = withRepeat(
    withTiming(1000, {
      duration: 1000,
      easing: Easing.linear,
    }),
    -1,
    false
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  if (!isLoading) {
    return <View style={containerStyle}>{children}</View>;
  }

  return (
    <View style={[containerStyle]}>
      {layout.map((item) => (
        <View key={item.key} style={[styles.skeleton, item.style]}>
          <Animated.View style={[styles.skeletonOverlay, animatedStyle]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    borderRadius: 4,
  },
  skeletonOverlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
    opacity: 0.5,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
