import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { router } from "expo-router";
import Button from "../ui/button";
import { editBudgetById, getBudgetById } from "@/db/budgets";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import DropDownPicker from "react-native-dropdown-picker";
import { budgetTypes } from "@/constants/Budgets";
import FormField from "../ui/form-field";

export default function BudgetEditActionSheet({
  sheetId,
  payload,
}: SheetProps<"budget-edit">) {
  const showAlert = useShowErrorAlert();
  const [updateBudget, setUpdateBudget] = useState<{
    name: string;
    limitedAmount: number;
  }>({
    name: "",
    limitedAmount: 0,
  });
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] =
    useState<{ label: string; value: string }[]>(budgetTypes);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const handelOnPressCancel = () => {
    // Hide the action sheet
    actionSheetRef.current?.hide();
  };

  const limitedAmountOnChange = (value: string) => {
    setUpdateBudget((prevState) => ({
      ...prevState,
      limitedAmount: +value.trim(),
    }));
  };

  const handelOnPressSave = async () => {
    // Check if the action sheet have budget id that pass from detail budget screen
    if (!payload?.budgetId) {
      showAlert({
        message: "Budget id is missing",
      });
      return;
    }

    if (!value) {
      showAlert({
        message: "Budget name is missing",
      });
      return;
    }
    try {
      setIsLoading(true);

      const budget = {
        ...updateBudget,
        name: value,
      };
      // Update budget
      await editBudgetById(payload.budgetId, budget.name, budget.limitedAmount);

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

  useEffect(() => {
    if (!payload?.budgetId) {
      return;
    }
    (async () => {
      setIsLoading(true);
      const dataBudget = await getBudgetById(payload?.budgetId);

      if (!dataBudget) {
        showAlert({
          message: "Budget not found to update",
        });
        return;
      }
      // Set budget details from budget details by id to use in edit
      setUpdateBudget({
        name: dataBudget.name,
        limitedAmount: dataBudget.limitedAmount,
      });
      setValue(dataBudget.name);

      setIsLoading(false);
    })();
  }, [payload?.budgetId]);

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
          height: 280,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Text
          style={[
            styles.actionTitle,
            {
              color: colors.gray[300],
            },
          ]}
        >
          Edit the budget
        </Text>
        <DropDownPicker
          placeholder="Budget Name"
          placeholderStyle={[styles.switchText]}
          disabled={isLoading}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          textStyle={[styles.switchText]}
          style={{
            borderColor: colors.gray[100],
            marginVertical: 10,
          }}
        />
        <FormField
          handleOnChange={(value) => limitedAmountOnChange(value)}
          label="Limited Amount"
          labelShown={false}
          placeholder="Limited Amount"
          value={
            updateBudget.limitedAmount === 0
              ? ""
              : updateBudget.limitedAmount.toString()
          }
          keyboardType="numeric"
        />
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
            title="Save"
            callbackFn={handelOnPressSave}
            style={{
              width: "40%",
            }}
            variant="primary"
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
  switchText: {
    color: colors.gray[400],
    fontSize: fontSize.text,
    fontWeight: "600",
  },
});
