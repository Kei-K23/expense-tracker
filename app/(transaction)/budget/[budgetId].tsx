import CustomNavHeader from "@/components/custom-nav-header";
import { colors } from "@/constants/Colors";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function BudgetIdScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <CustomNavHeader title="Create Budget" bgColor={colors.primary[100]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary[100],
  },
});
