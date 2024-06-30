import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import { defaultStyles, fontSize } from "@/constants/Style";
import {
  accountVerification,
  getUserById,
  registerUserAccountWithPhoneNumber,
} from "@/db/user";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { storeData } from "@/lib/async-storeage";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AccountVerifyScreen() {
  const navigation = useNavigation();
  const showAlert = useShowErrorAlert();
  // TODO: Check credentials can be device into phone number and user id in the component mounted
  const { credentials } = useLocalSearchParams<{
    credentials: string;
  }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);

  // Verify user account with SMS code and userId
  const handleOnPress = async () => {
    // Check if fields have values to register
    if (credentials === "") {
      showAlert({
        message: "credentials are missing to verify the account",
      });
      return;
    }

    // Get user account from url
    const userId = credentials?.split("-")[1];

    if (!userId) {
      showAlert({
        message: "User id is missing",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Verify the account
      const session = await accountVerification(code, userId);

      if (session.$id) {
        // Clear the fields
        setCode("");

        // Store valid session to async storage
        await storeData(keysForStorage.session, session);

        // Get user account for redirect to main home screen when user already setup their account
        const existingUser = await getUserById(session.userId);

        // If user already registered and have account
        if (existingUser) {
          // Store the newly created user
          await storeData(keysForStorage.user, existingUser);

          // Navigate to main home screen
          router.push("/home");
          return;
        }

        showAlert({
          message: "Successfully verify user account",
        });

        // Navigate to account setup screen
        router.push("/setup-user-account");
      } else {
        showAlert({
          message: "Something went wrong when verifying the code",
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

  const handleResendCode = async () => {
    const phone = credentials?.split("-")[0];
    if (!phone) {
      showAlert({
        message: "Phone number is missing",
      });
      return;
    }

    if (countdown === 0) {
      // Logic to resend the SMS goes here
      try {
        setIsLoading(true);
        // Create a new account
        const userID = await registerUserAccountWithPhoneNumber(phone);

        if (userID) {
          // Navigate to account verification screen
          router.push(`/account-verify/${phone}-${userID}`);

          // Start the countdown
          setCountdown(60);
        } else {
          showAlert({
            message: "Something went wrong when registering new account",
          });
          return;
        }
      } catch (e: any) {
        showAlert({
          message: e,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Setup name for navigation
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Verification",
    });
  }, []);

  // Start the countdown timer for SMS code re-sending
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <SafeAreaView style={defaultStyles.layout}>
      <Text style={styles.title}>Enter your verification code</Text>
      <FormField
        handleOnChange={setCode}
        label="Verification code"
        labelShown={false}
        placeholder="Verification code"
        value={code}
        keyboardType="number-pad"
      />
      <Text
        style={{
          marginVertical: 10,
        }}
      >
        We send verification code via SMS to your phone{" "}
        <Text style={styles.text}>{credentials?.split("-")[0]}</Text>. You can
        check the code and verify the account.
      </Text>
      <TouchableOpacity onPress={handleResendCode} disabled={countdown > 0}>
        <Text style={[countdown > 0 ? styles.disabledText : styles.linkText]}>
          I didn't receive the code? Send again{" "}
          {countdown > 0 && `(${countdown}s)`}
        </Text>
      </TouchableOpacity>
      <Button title="Verify" callbackFn={handleOnPress} isLoading={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.headerSmall,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: colors.primary[100],
  },
  linkText: {
    textDecorationLine: "underline",
    marginBottom: 25,
    color: colors.primary[100],
  },
  disabledText: {
    color: colors.gray[300],
    marginBottom: 25,
  },
});
