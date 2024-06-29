import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type SeparatorProps = {
  style?: ViewStyle;
};
export default function Separator({ style }: SeparatorProps) {
  return <View style={[style, styles.default]} />;
}

const styles = StyleSheet.create({
  default: {
    height: 1,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
});
