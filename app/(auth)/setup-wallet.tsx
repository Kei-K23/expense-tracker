import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { createWallet } from "@/db/wallets";
import useAuthUser from "@/hooks/use-auth-user";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { WalletType } from "@/types";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SetupBudgetScreen() {
  const showAlert = useShowErrorAlert();
  const { user } = useAuthUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [budget, setBudget] = useState<WalletType>({
    name: "",
    type: "",
    user: null,
    balance: 0,
  });

  const handleOnChange = (field: keyof WalletType, value: string) => {
    setBudget((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  const handleOnPress = async () => {
    // Check user id exists, if exists set to account id
    if (user) {
      setBudget({
        ...budget,
        user: user,
      });
    } else {
      showAlert({
        message: "User is missing",
      });
      return;
    }

    // Check if fields have values to register
    if (budget.name === "" || budget.balance < 0 || budget.type === "") {
      showAlert({
        message: "Please fill in all the fields",
      });
      return;
    }

    try {
      setIsLoading(true);
      // User account creation
      const newBudget = await createWallet(budget);

      if (newBudget.$id) {
        showAlert({
          message: "Add new wallet successfully",
        });

        // Navigate to setup budget screen
        router.push("/home");
        return;
      }
    } catch (e: any) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      showAlert({
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>Let's create your first wallet!</Text>
      {/* Placeholder for middle white space of the screen */}
      <View style={styles.placeHolder} />
      <View style={[styles.formContainer]}>
        <FormField
          handleOnChange={(value) => handleOnChange("name", value)}
          label="Name"
          labelShown={false}
          placeholder="Name"
          value={budget.name}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("balance", value)}
          label="Balance"
          labelShown={false}
          placeholder="Balance"
          value={budget.balance.toString()}
        />
        {/* TODO Replace with dropdown select element */}
        <FormField
          handleOnChange={(value) => handleOnChange("type", value)}
          label="Account Type"
          labelShown={false}
          placeholder="Account Type"
          value={budget.type}
        />
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Button
            title="Continue"
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
  title: {
    fontSize: fontSize.headerSmall,
    fontWeight: "bold",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: "#fff",
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  placeHolder: {
    flex: 1,
  },
});
