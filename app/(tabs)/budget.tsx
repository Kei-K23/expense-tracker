import BudgetHeader from "@/components/budget-screen/budget-header";
import BudgetListsContainer from "@/components/budget-screen/budget-lists-container";
import Button from "@/components/ui/button";
import { keysForStorage } from "@/constants/Keys";
import { getAllBudgetsByUserIdAndMonth } from "@/db/budgets";
import useMonth from "@/hooks/use-month";
import { getStoreData } from "@/lib/async-storeage";
import { Budget, User } from "@/types";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function BudgetScreen() {
  const { currentMonth, getNextMonth, getPreviousMonth } = useMonth();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const fetchData = async () => {
    const user = await getStoreData<User>(keysForStorage.user);
    // Get all budget items from current month and user id
    const budgetsData = await getAllBudgetsByUserIdAndMonth(
      user?.$id!,
      currentMonth
    );
    setBudgets(budgetsData.documents);
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    // Clear previous data before fetching new month's budgets
    setBudgets([]);

    (async () => {
      // Fetch data
      await fetchData();
    })();
  }, [currentMonth]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BudgetHeader
        month={currentMonth}
        getNextMonth={getNextMonth}
        getPreviousMonth={getPreviousMonth}
      />
      <BudgetListsContainer
        budgets={budgets}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 20,
        }}
      >
        <Button
          title="Create a budget"
          callbackFn={() => {
            router.push("/create-budget");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
