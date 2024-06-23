import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  callbackFn?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

export default function Button({
  title,
  callbackFn,
  isLoading = false,
  variant = "primary",
}: ButtonProps) {
  const getButtonStyle = () => {
    if (isLoading) return styles.gray;
    return variant === "primary" ? styles.primary : styles.secondary;
  };

  const getTextStyle = () => {
    if (isLoading) return styles.textGray;
    return variant === "primary" ? styles.textPrimary : styles.textSecondary;
  };

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={callbackFn}
      style={[styles.btn, getButtonStyle()]}
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
    textTransform: "capitalize",
  },
  primary: {
    backgroundColor: colors.primary[100],
  },
  secondary: {
    backgroundColor: colors.primary[300],
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
