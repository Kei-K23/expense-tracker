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

export default function SetupWalletScreen() {
  const showAlert = useShowErrorAlert();
  const { user } = useAuthUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    type: "",
    user: null,
    balance: 0,
  });

  const handleOnChange = (field: keyof WalletType, value: string) => {
    setWallet((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  const handleOnPress = async () => {
    // Check user id exists, if exists set to account id
    if (!user) {
      showAlert({
        message: "User is missing",
      });
      return;
    }

    const walletData = {
      ...wallet,
      user: user,
    };

    // Check if fields have values to register
    if (
      walletData.name === "" ||
      walletData.balance < 0 ||
      walletData.type === ""
    ) {
      showAlert({
        message: "Please fill in all the fields",
      });
      return;
    }

    try {
      setIsLoading(true);
      // new wallet creation
      const newWallet = await createWallet(walletData);

      if (newWallet.$id) {
        showAlert({
          message: "Add new wallet successfully",
        });

        // Navigate to main home screen
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
          value={wallet.name}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("balance", value)}
          label="Balance"
          labelShown={false}
          placeholder="Balance"
          value={wallet.balance === 0 ? "" : wallet.balance.toString()}
        />
        {/* TODO Replace with dropdown select element */}
        <FormField
          handleOnChange={(value) => handleOnChange("type", value)}
          label="Account Type"
          labelShown={false}
          placeholder="Account Type"
          value={wallet.type}
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
