import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BudgetHeaderProps = {
  month: string;
  getPreviousMonth: () => void;
  getNextMonth: () => void;
};
export default function BudgetHeader({
  month,
  getNextMonth,
  getPreviousMonth,
}: BudgetHeaderProps) {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={getPreviousMonth}>
        <Ionicons name="arrow-back-circle" size={28} color={"#fff"} />
      </TouchableOpacity>
      <Text style={[styles.title]}>{month}</Text>
      <TouchableOpacity onPress={getNextMonth}>
        <Ionicons name="arrow-forward-circle" size={28} color={"#fff"} />
      </TouchableOpacity>
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
    backgroundColor: colors.primary[100],
  },
  title: {
    fontSize: fontSize.textBold,
    fontWeight: "800",
    color: "#fff",
  },
});
