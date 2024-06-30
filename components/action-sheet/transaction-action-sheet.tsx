import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import Separator from "../ui/separator";
import { router } from "expo-router";

export default function TransactionActionSheet({ sheetId }: SheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const handelOnPress = (route: string) => {
    // Hide the action sheet
    actionSheetRef.current?.hide();
    // Navigate to the selected route
    return router.push(route);
  };

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      indicatorStyle={{
        width: 100,
      }}
      gestureEnabled={true}
    >
      <View
        style={{
          paddingVertical: 10,
          height: 230,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Text style={[styles.actionTitle]}>Choose Transaction</Text>
        <View>
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => handelOnPress("/create-budget")}
          >
            <Text
              style={[
                styles.actionItemText,
                {
                  color: colors.green[100],
                },
              ]}
            >
              Budgets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => handelOnPress("/create-income")}
          >
            <Text
              style={[
                styles.actionItemText,
                {
                  color: colors.green[100],
                },
              ]}
            >
              Incomes
            </Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => handelOnPress("/create-expense")}
          >
            <Text
              style={[
                styles.actionItemText,
                {
                  color: colors.danger[100],
                },
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => handelOnPress("/transfer")}
          >
            <Text
              style={[
                styles.actionItemText,
                {
                  color: colors.blue[100],
                },
              ]}
            >
              Transfer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  actionTitle: {
    textAlign: "center",
    fontSize: fontSize.text,
    fontWeight: "700",
    marginBottom: 10,
    color: colors.gray[300],
  },
  actionContainer: {
    flexDirection: "column",
  },
  actionItem: {
    padding: 15,
    marginBottom: 10,
  },
  actionItemText: {
    textAlign: "center",
    fontWeight: "800",
  },
});
