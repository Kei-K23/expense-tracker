import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import { colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { TransactionData } from "@/types";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

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
    <SafeAreaView style={[defaultStyles.layout]}>
      <CustomNavHeader title="Expense" />
      <TransactionHeader
        balance={transaction.balance}
        handleOnChange={handleOnChange}
        bgColor={colors.green[100]}
      />
    </SafeAreaView>
  );
}
