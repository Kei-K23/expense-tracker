import { fontSize } from "@/constants/Style";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomNavHeaderProps = {
  title: string;
  bgColor?: string;
};

export default function CustomNavHeader({
  title,
  bgColor,
}: CustomNavHeaderProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={25} color={bgColor && "#fff"} />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {
            color: bgColor ? "#fff" : "#000",
          },
        ]}
      >
        {title}
      </Text>

      {/* NOTE: This is just for simulation to center title */}
      <View style={{ width: 25, height: 25 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: fontSize.textBold,
  },
});
