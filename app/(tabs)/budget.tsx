import BudgetHeader from "@/components/budget-screen/budget-header";
import useMonth from "@/hooks/use-current-month";
import React from "react";
import { SafeAreaView } from "react-native";

export default function BudgetScreen() {
  const { currentMonth, getNextMonth, getPreviousMonth } = useMonth();
  return (
    <SafeAreaView>
      <BudgetHeader
        month={currentMonth}
        getNextMonth={getNextMonth}
        getPreviousMonth={getPreviousMonth}
      />
    </SafeAreaView>
  );
}
