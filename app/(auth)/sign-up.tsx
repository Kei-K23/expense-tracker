import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { defaultStyles, fontSize } from "@/constants/Style";
import { registerUserAccountWithPhoneNumber } from "@/db/user";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
  const showAlert = useShowErrorAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  const handleOnPress = async () => {
    // Check if fields have values to register
    if (phone === "") {
      showAlert({
        message: "Please enter your phone number",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Create a new account
      const userID = await registerUserAccountWithPhoneNumber(phone);

      if (userID) {
        // Navigate to account verification screen
        router.push(`/account-verify/${phone}-${userID}`);

        // Clear the fields
        setPhone("");
      } else {
        showAlert({
          message: "Something went wrong when registering new account",
        });
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
    <SafeAreaView style={defaultStyles.layout}>
      <Text style={styles.title}>Register new account</Text>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <FormField
          handleOnChange={setPhone}
          label="Phone"
          labelShown={false}
          placeholder="Phone number"
          value={phone}
          keyboardType="phone-pad"
        />
      </View>
      <Button
        title="Sign Up"
        callbackFn={handleOnPress}
        isLoading={isLoading}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.text,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.gray[300],
  },
});
