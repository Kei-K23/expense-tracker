// import React from "react";
// import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
// import Animated, {
//   Easing,
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withTiming,
// } from "react-native-reanimated";

// type SkeletonContentProps = {
//   isLoading: boolean;
//   containerStyle?: StyleProp<ViewStyle>;
//   children: React.ReactNode;
// };

// export default function SkeletonContent({
//   isLoading,
//   containerStyle,
//   children,
// }: SkeletonContentProps) {
//   const translateX = useSharedValue(-1000);

//   translateX.value = withRepeat(
//     withTiming(1000, {
//       duration: 1000,
//       easing: Easing.linear,
//     }),
//     -1,
//     false
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: translateX.value }],
//     };
//   });

//   // Manipulate children elements
//   const modifiedChildren = React.Children.map(children, (child, index) => {
//     // Check if the child is valid react element
//     if (React.isValidElement(child)) {
//       // Skip and return original child element if aria-ignore prop is set to true
//       // Add key prop to ensure stable rendering across renders
//       if (child.props["aria-ignore"]) {
//         child.key = index.toString();
//         return child;
//       } else {
//         // Skeleton component render here
//         const existingStyle = child.props.style;
//         return (
//           <View style={[styles.skeleton, existingStyle]}>
//             <Animated.View style={[styles.skeletonOverlay, animatedStyle]} />
//           </View>
//         );
//       }
//     } else {
//       // No Skeleton component here
//       // Return original child element if not a valid React element
//       return child;
//     }
//   });

//   // Return original children if not loading
//   if (!isLoading) {
//     return <View style={containerStyle}>{children}</View>;
//   }

//   return <View style={[containerStyle]}>{modifiedChildren}</View>;
// }

// const styles = StyleSheet.create({
//   skeleton: {
//     backgroundColor: "#e0e0e0",
//     overflow: "hidden",
//     borderRadius: 4,
//   },
//   skeletonOverlay: {
//     height: "100%",
//     width: "100%",
//     backgroundColor: "#f0f0f0",
//     opacity: 0.5,
//     position: "absolute",
//     top: 0,
//     left: 0,
//   },
// });

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type SkeletonContentProps = {
  isLoading: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export default function SkeletonContent({
  isLoading,
  containerStyle,
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

  // Function to recursively process child elements
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        // If aria-ignore is set to true, skip and return the original child
        if (child.props["aria-ignore"]) {
          return child;
        }

        // Skeleton component render here
        const existingStyle = child.props.style;
        return (
          <View key={index} style={[styles.skeleton, existingStyle]}>
            <Animated.View style={[styles.skeletonOverlay, animatedStyle]} />
          </View>
        );
      }
      return child;
    });
  };

  if (!isLoading) {
    return <View style={containerStyle}>{children}</View>;
  }

  const modifiedChildren = processChildren(children);

  return <View style={[containerStyle]}>{modifiedChildren}</View>;
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
