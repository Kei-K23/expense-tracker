import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { Budget } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

type BudgetListItemProps = {
  item: Budget;
};

export default function BudgetListItem({ item }: BudgetListItemProps) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.subContainer]}>
        <View style={[styles.subContainer]}>
          <View
            style={[
              styles.indicator,
              {
                backgroundColor: item.color,
              },
            ]}
          />
          <Text style={[styles.name]}>{item.name}</Text>
        </View>
        {item.limitedAmount === item.expensedAmount && (
          <Ionicons name="warning" size={22} color={colors.danger[100]} />
        )}
      </View>
      <Text style={[styles.remaining]}>
        Remaining ${item.limitedAmount - (item.expensedAmount || 0)}
      </Text>
      <ProgressBar
        //  Calculate the remaining amount
        progress={(item.expensedAmount || 0) / item.limitedAmount}
        color={item.color}
        style={{
          height: 7.5,
          borderRadius: 10,
        }}
      />
      <Text style={[styles.remainingMessage]}>
        ${item.expensedAmount || 0} of ${item.limitedAmount}
      </Text>
      {item.limitedAmount === item.expensedAmount && (
        <Text style={[styles.warningText]}>You've exceed the limit!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  name: {
    fontSize: fontSize.textBold,
    fontWeight: "800",
    marginBottom: 5,
  },
  remaining: {
    fontSize: fontSize.headerTinySmall,
    marginBottom: 5,
    fontWeight: "900",
  },
  remainingMessage: {
    marginTop: 5,
    fontSize: fontSize.text,
    color: colors.gray[300],
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  warningText: {
    marginTop: 5,
    color: colors.danger[100],
  },
});
