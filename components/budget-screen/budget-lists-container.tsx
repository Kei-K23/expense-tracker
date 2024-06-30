import { Budget } from "@/types";
import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import EmptyList from "../ui/empty-list";
import BudgetListItem from "./budget-list-item";

type BudgetListsContainerProps = {
  budgets: Budget[];
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
};

export default function BudgetListsContainer({
  budgets,
  onRefresh,
  isRefreshing,
}: BudgetListsContainerProps) {
  return (
    <FlatList
      style={[style.container]}
      data={budgets}
      renderItem={({ item }) => <BudgetListItem item={item} />}
      keyExtractor={(item) => item.$id}
      ListEmptyComponent={() => (
        <EmptyList
          title="You don't have a budget."
          description="Let's make one so you in control."
        />
      )}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    width: "100%",
  },
});
