import BudgetHeader from "@/components/budget-screen/budget-header";
import BudgetListsContainer from "@/components/budget-screen/budget-lists-container";
import Button from "@/components/ui/button";
import { keysForStorage } from "@/constants/Keys";
import { getAllBudgetsByUserIdAndMonth } from "@/db/budgets";
import useMonth from "@/hooks/use-current-month";
import { getStoreData } from "@/lib/async-storeage";
import { Budget, User } from "@/types";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function BudgetScreen() {
  const { currentMonth, getNextMonth, getPreviousMonth } = useMonth();
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    // Clear previous data before fetching new month's budgets
    setBudgets([]);

    (async () => {
      const user = await getStoreData<User>(keysForStorage.user);
      // Get all budget items from current month and user id
      const budgetsData = await getAllBudgetsByUserIdAndMonth(
        user?.$id!,
        currentMonth
      );

      setBudgets(budgetsData.documents);
    })();
  }, [currentMonth]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BudgetHeader
        month={currentMonth}
        getNextMonth={getNextMonth}
        getPreviousMonth={getPreviousMonth}
      />
      <BudgetListsContainer budgets={budgets} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 20,
        }}
      >
        <Button title="Create a budget" />
      </View>
    </SafeAreaView>
  );
}
