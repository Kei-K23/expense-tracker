import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type BadgeProps = {
  title: string;
  balance: number;
  iconColor: string;
  style?: ViewStyle;
};
export default function Badge({
  title,
  balance,
  style,
  iconColor,
}: BadgeProps) {
  return (
    <View
      style={[
        styles.default,
        style,
        {
          backgroundColor: iconColor,
        },
      ]}
    >
      <View style={[styles.iconContainer]}>
        <Ionicons name="cash" size={25} color={iconColor} />
      </View>
      <View>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.balance]}>${balance?.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: colors.primary[300],
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 10,
  },
  iconContainer: {
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
  },
  title: {
    fontWeight: "600",
    color: "#fff",
  },
  balance: {
    fontWeight: "800",
    fontSize: fontSize.headerTiny,
    color: "#fff",
  },
});
