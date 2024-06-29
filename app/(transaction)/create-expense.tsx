import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

export default function CreateExpenseScreen() {
  const navigation = useNavigation();
  // Setup name for navigation
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Verification",
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Expense</Text>
    </SafeAreaView>
  );
}
