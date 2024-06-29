import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import { defaultStyles, fontSize } from "@/constants/Style";
import { loginWithEmailPassword } from "@/db/user";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { storeData } from "@/lib/async-storeage";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const showAlert = useShowErrorAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnPress = async () => {
    // Check email and password fields are valid and not empty
    if (email === "") {
      showAlert({
        message: "Please enter your email",
      });
      return;
    }

    if (password === "") {
      showAlert({
        message: "Please enter your password",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Create a new account
      const session = await loginWithEmailPassword(email, password);

      if (session) {
        storeData(keysForStorage.session, session);
        // Navigate to account verification screen
        router.push(`/home`);

        // Clear the fields
        setEmail("");
        setPassword("");
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
          handleOnChange={setEmail}
          label="Email"
          labelShown={false}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
        />
        <FormField
          handleOnChange={setPassword}
          label="Password"
          labelShown={false}
          placeholder="Password"
          value={password}
        />
      </View>
      <Button
        title="Login in"
        callbackFn={handleOnPress}
        isLoading={isLoading}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: colors.gray[300],
          }}
        >
          If you don't have an account?{" "}
        </Text>
        <Link
          style={{
            color: colors.primary[100],
          }}
          href={"/sign-up"}
        >
          Sign up!
        </Link>
      </View>
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
