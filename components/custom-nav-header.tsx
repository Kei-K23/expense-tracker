import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomNavHeaderProps = {
  title: string;
};

export default function CustomNavHeader({ title }: CustomNavHeaderProps) {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={25} color={colors.gray[300]} />
      </TouchableOpacity>
      <Text>{title}</Text>

      {/* NOTE: This is just for simulation to center title */}
      <View style={{ width: 25, height: 25 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
