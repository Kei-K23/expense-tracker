import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormSwitchField from "@/components/ui/form-switch-field";
import { budgetTypes } from "@/constants/Budgets";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import { fontSize } from "@/constants/Style";
import { createBudget } from "@/db/budgets";
import useMonth from "@/hooks/use-month";
import useRandomColor from "@/hooks/use-random-color";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { getStoreData } from "@/lib/async-storeage";
import { BudgetType, User } from "@/types";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Switch } from "react-native-paper";

export default function CreateBudgetScreen() {
  const randomColor = useRandomColor();
  const showAlert = useShowErrorAlert();
  const { formatToMonthYear } = useMonth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] =
    useState<{ label: string; value: string }[]>(budgetTypes);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [budget, setBudget] = useState<BudgetType>({
    color: "",
    name: "",
    limitedAmount: 0,
    user: "",
    receiveAlert: true,
    createdMonth: formatToMonthYear(new Date()),
  });

  const handleOnChange = (field: keyof BudgetType, value: string) => {
    setBudget((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  const receiveAlertOnChange = (value: boolean) => {
    setBudget((prevState) => ({
      ...prevState,
      receiveAlert: value,
    }));
  };

  const handleOnPress = async () => {
    try {
      setIsLoading(true);
      const user = await getStoreData<User>(keysForStorage.user);

      // Check if user id exists
      if (!user) {
        showAlert({
          message: "User id is missing",
        });
        return;
      }

      // Set the user id to budget
      const updatedBudget = {
        ...budget,
        user: user.$id,
      };

      // IF switch is off that means default budget dropdown is used
      if (!isSwitchOn) {
        if (value) {
          // Set the budget name
          updatedBudget.name = value;
        } else {
          showAlert({
            message: "Missing budget name",
          });
          return;
        }
      }

      // Set color for the budget
      updatedBudget.color = randomColor;

      // Create budget here
      const newBudget = await createBudget(updatedBudget);
      if (!newBudget) {
        showAlert({
          message: "Failed to create budget. Please try again later",
        });
        return;
      }

      // Navigate back to budget screen
      router.push("/budget");
    } catch (e: any) {
      showAlert({
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomNavHeader title="Create Budget" bgColor={colors.primary[100]} />
      <TransactionHeader
        title="How much do you want to spend?"
        balance={budget.limitedAmount}
        bgColor={colors.primary[100]}
      />
      <View style={[styles.formContainer]}>
        {isSwitchOn ? (
          <FormField
            handleOnChange={(value) => handleOnChange("name", value)}
            label="Budget Name"
            labelShown={false}
            placeholder="Budget Name"
            value={budget.name}
          />
        ) : (
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
        )}
        <View style={[styles.switchContainer]}>
          <Text style={[styles.switchLabel]}>Create your own budget name</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <FormField
          handleOnChange={(value) => handleOnChange("limitedAmount", value)}
          label="Limited Amount"
          labelShown={false}
          placeholder="Limited Amount"
          value={
            budget.limitedAmount === 0 ? "" : budget.limitedAmount.toString()
          }
          keyboardType="numeric"
        />
        <FormSwitchField
          label="Receive Alert"
          description="Receive alert when it reaches some point."
          labelShown={true}
          value={budget.receiveAlert}
          handleOnChange={receiveAlertOnChange}
        />
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Button
            title="Create"
            isLoading={isLoading}
            callbackFn={handleOnPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary[100],
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -15,
  },
  switchLabel: {
    fontWeight: "600",
    color: colors.gray[400],
  },
  switchText: {
    color: colors.gray[400],
    fontSize: fontSize.text,
    fontWeight: "600",
  },
});
