import CustomNavHeader from "@/components/custom-nav-header";
import Button from "@/components/ui/button";
import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { getBudgetById } from "@/db/budgets";
import { Budget } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ProgressBar } from "react-native-paper";

export default function BudgetIdScreen() {
  const { budgetId } = useLocalSearchParams<{ budgetId: string }>();
  const [budget, setBudget] = useState<Budget>();

  const handelOnPressDelete = () => {
    // Open action sheet to delete
    SheetManager.show("budget-delete", {
      payload: { budgetId: budget?.$id! },
    });
  };
  const handelOnPressEdit = () => {
    // Open action sheet to edit
    SheetManager.show("budget-edit", {
      payload: { budgetId: budget?.$id! },
    });
  };

  useEffect(() => {
    (async () => {
      // Get budget data by id and set it to state
      const budgetData = await getBudgetById(budgetId!);
      setBudget(budgetData);
    })();
  }, [budgetId]);

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomNavHeader title="Detail Budget" />
      <View style={[styles.subContainer]}>
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: budget?.color,
            },
          ]}
        />
        <Text style={[styles.name]}>{budget?.name}</Text>
      </View>
      <Text style={[styles.remaining]}>Remaining</Text>
      <Text style={[styles.balance]}>
        $ {budget?.limitedAmount! - (budget?.expensedAmount || 0) || 0}
      </Text>
      <ProgressBar
        //  Calculate the remaining amount
        progress={(budget?.expensedAmount || 0) / budget?.limitedAmount! || 0}
        color={budget?.color}
        style={{
          height: 9.5,
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      />
      {budget && budget?.limitedAmount === budget?.expensedAmount && (
        <View style={[styles.warningContainer]}>
          <Ionicons name="warning" size={25} color={colors.danger[100]} />
          <Text style={[styles.warningText]}>You've exceed the limit!</Text>
        </View>
      )}
      {/* Simulate middle white space */}
      <View style={{ flex: 1 }} />
      <View style={[styles.btnContainer]}>
        <Button title="Edit" callbackFn={handelOnPressEdit} />
        <Button
          title="Delete"
          variant="danger"
          callbackFn={handelOnPressDelete}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  subContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  name: {
    fontSize: fontSize.textBold,
    fontWeight: "800",
    marginBottom: 5,
  },
  remaining: {
    fontSize: fontSize.headerSmall,
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center",
  },
  balance: {
    fontSize: 50,
    fontWeight: "900",
    marginTop: 10,
    textAlign: "center",
  },
  warningContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 20,
  },
  warningText: {
    color: colors.danger[100],
    fontSize: fontSize.text,
    fontWeight: "700",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
