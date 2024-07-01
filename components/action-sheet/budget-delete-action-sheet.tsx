import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { router } from "expo-router";
import Button from "../ui/button";
import { deleteBudgetById } from "@/db/budgets";
import useShowErrorAlert from "@/hooks/use-show-error-alert";

export default function BudgetDeleteActionSheet({
  sheetId,
  payload,
}: SheetProps<"budget-delete">) {
  const showAlert = useShowErrorAlert();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handelOnPressCancel = () => {
    // Hide the action sheet
    actionSheetRef.current?.hide();
  };

  const handelOnPressDelete = async () => {
    // Check if the action sheet have budget id that pass from detail budget screen
    if (!payload?.budgetId) {
      showAlert({
        message: "Budget id is missing",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Delete budget
      await deleteBudgetById(payload.budgetId);

      // Hide the action sheet
      handelOnPressCancel();

      // Navigate back to budget screen
      router.push("/budget");
    } catch (e: any) {
      showAlert({
        message: e.message,
      });
      return;
    } finally {
      setIsLoading(false);
    }
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
          paddingHorizontal: 20,
          height: 180,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Text
          style={[
            styles.actionTitle,
            {
              color: colors.danger[100],
            },
          ]}
        >
          Delete the budget?
        </Text>
        <Text style={[styles.actionTitle]}>
          Are you sure do you wanna remove this budget?
        </Text>
        <View style={[styles.btnContainer]}>
          <Button
            isLoading={isLoading}
            title="Cancel"
            callbackFn={handelOnPressCancel}
            style={{
              width: "40%",
            }}
            variant="secondary"
          />
          <Button
            isLoading={isLoading}
            title="Delete"
            callbackFn={handelOnPressDelete}
            style={{
              width: "40%",
            }}
            variant="danger"
          />
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
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
});
