import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormSwitchField from "@/components/ui/form-switch-field";
import { colors } from "@/constants/Colors";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { BudgetType } from "@/types";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function CreateBudgetScreen() {
  const showAlert = useShowErrorAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [budget, setBudget] = useState<BudgetType>({
    name: "",
    limitedAmount: 0,
    user: "",
    receiveAlert: true,
    createdMonth: new Date().toISOString().split("T")[0],
  });

  const handleOnChange = (field: keyof BudgetType, value: string) => {
    setBudget((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  const limitedAmountOnChange = (value: string) => {
    setBudget((prevState) => ({
      ...prevState,
      limitedAmount: +value.trim(),
    }));
  };

  const handleOnPress = async () => {
    try {
      setIsLoading(true);
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
        handleOnChange={limitedAmountOnChange}
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
