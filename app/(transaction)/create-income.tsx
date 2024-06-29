import CustomNavHeader from "@/components/custom-nav-header";
import { defaultStyles } from "@/constants/Style";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function CreateIncomeScreen() {
  return (
    <SafeAreaView style={[defaultStyles.layout]}>
      <CustomNavHeader title="Income" />
      <Text>Income</Text>
    </SafeAreaView>
  );
}
