import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import { colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { TransactionData } from "@/types";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CreateExpenseScreen() {
  const [transaction, setTransaction] = useState<TransactionData>({
    name: "",
    description: "",
    type: "Expense",
    budgets: null,
    balance: 0,
    attachmentURL: null,
    category: "",
  });

  const handleOnChange = (field: keyof TransactionData, value: string) => {
    setTransaction((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomNavHeader title="Expense" bgColor={colors.danger[300]} />
      <TransactionHeader
        balance={transaction.balance}
        handleOnChange={handleOnChange}
        bgColor={colors.danger[300]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
