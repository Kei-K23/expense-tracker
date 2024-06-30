import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormSwitchField from "@/components/ui/form-switch-field";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import { createBudget } from "@/db/budgets";
import useMonth from "@/hooks/use-month";
import useRandomColor from "@/hooks/use-random-color";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { getStoreData } from "@/lib/async-storeage";
import { BudgetType, User } from "@/types";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function CreateBudgetScreen() {
  const randomColor = useRandomColor();
  const showAlert = useShowErrorAlert();
  const { formatToMonthYear } = useMonth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleOnPress = async () => {
    try {
      setIsLoading(true);
      const user = await getStoreData<User>(keysForStorage.user);
      // Check if user id is exist or not
      if (user) {
        // Set the user id to budget
        handleOnChange("user", user.$id);
      } else {
        showAlert({
          message: "User id is missing",
        });
        return;
      }

      // Set color for the budget
      handleOnChange("color", randomColor);

      // Create budget here
      const newBudget = await createBudget(budget);
      if (!newBudget) {
        showAlert({
          message: "Failed to create budget. Please try again later.",
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
        <FormField
          handleOnChange={(value) => handleOnChange("name", value)}
          label="Name"
          labelShown={false}
          placeholder="Name"
          value={budget.name}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("limitedAmount", value)}
          label="Limited Amount"
          labelShown={false}
          placeholder="Limited Amount"
          value={budget.limitedAmount.toString()}
          keyboardType="numeric"
        />
        <FormSwitchField
          label="Receive Alert"
          description="Receive alert when it reaches some point."
          labelShown={true}
          value={budget.receiveAlert}
          handleOnChange={() => {}}
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
});
