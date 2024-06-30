import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  callbackFn?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
};

export default function Button({
  title,
  callbackFn,
  isLoading = false,
  variant = "primary",
  style,
}: ButtonProps) {
  const getButtonStyle = () => {
    if (isLoading) return styles.gray;
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "danger":
        return styles.danger;
      default:
        return styles.gray;
    }
  };

  const getTextStyle = () => {
    if (isLoading) return styles.textGray;
    switch (variant) {
      case "primary":
      case "danger":
        return styles.textPrimary;
      case "secondary":
        return styles.textSecondary;
      default:
        return styles.gray;
    }
  };

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={callbackFn}
      style={[styles.btn, getButtonStyle(), style]}
    >
      <Text style={[styles.text, getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  text: {
    fontSize: fontSize.text,
    fontWeight: "900",
  },
  primary: {
    backgroundColor: colors.primary[100],
  },
  secondary: {
    backgroundColor: colors.primary[300],
  },
  danger: {
    backgroundColor: colors.danger[100],
  },
  gray: {
    backgroundColor: colors.gray[100],
  },
  textPrimary: {
    color: "#fff",
  },
  textSecondary: {
    color: colors.primary[100],
  },
  textGray: {
    color: colors.gray[300],
  },
});
