import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

type SkeletonLoaderProps = {
  styles?: {
    container?: StyleProp<ViewStyle>;
    skeleton?: StyleProp<ViewStyle>;
    skeletonOverlay?: StyleProp<ViewStyle>;
  };
};
export default function SkeletonLoader({ styles }: SkeletonLoaderProps) {
  const translateX = useSharedValue(-width);

  translateX.value = withRepeat(
    withTiming(width, {
      duration: 1000,
      easing: Easing.linear,
    }),
    -1,
    false
  );

  //! Check for type
  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <View style={[defaultStyles.skeleton, styles?.skeleton]}>
        <Animated.View
          style={[
            defaultStyles.skeletonOverlay,
            animatedStyle,
            styles?.skeletonOverlay,
          ]}
        />
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  skeleton: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  skeletonOverlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
    opacity: 0.5,
  },
});
