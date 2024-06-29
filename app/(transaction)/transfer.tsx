import CustomNavHeader from "@/components/custom-nav-header";
import { defaultStyles } from "@/constants/Style";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function CreateTransferScreen() {
  return (
    <SafeAreaView style={[defaultStyles.layout]}>
      <CustomNavHeader title="Transfer" />
      <Text>Transfer</Text>
    </SafeAreaView>
  );
}
