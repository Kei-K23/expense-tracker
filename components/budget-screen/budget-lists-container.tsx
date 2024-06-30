import { Budget } from "@/types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyList from "../ui/empty-list";

type BudgetListsContainerProps = {
  budgets: Budget[];
};

export default function BudgetListsContainer({
  budgets,
}: BudgetListsContainerProps) {
  return (
    <FlatList
      style={[style.container]}
      data={budgets}
      renderItem={({ item }) => <View key={item.$id}>{item.name}</View>}
      keyExtractor={(item) => item.$id}
      ListEmptyComponent={() => (
        <EmptyList
          title="You don't have a budget."
          description="Let's make one so you in control."
        />
      )}
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
