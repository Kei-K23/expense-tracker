import Button from "@/components/ui/button";
import FileUploadPicker from "@/components/ui/file-upload-picker";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import { defaultStyles, fontSize } from "@/constants/Style";
import { createUserAccount, getSignedInUser } from "@/db/user";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { getStoreData, storeData } from "@/lib/async-storeage";
import { UserType } from "@/types";
import { getDocumentAsync } from "expo-document-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

type UserAccountType = UserType & {
  confirmPassword: string;
};

export default function SetupUserAccountScreen() {
  const showAlert = useShowErrorAlert();
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userAccount, setUserAccount] = useState<UserAccountType>({
    username: "",
    email: "",
    phone: "",
    avatar: null,
    accountId: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (field: keyof UserAccountType, value: string) => {
    setUserAccount((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  const openPicker = async () => {
    // Open the file picker to select an image
    const result = await getDocumentAsync({
      type: ["image/png", "image/jpeg"],
    });

    if (!result.canceled) {
      // 20MB equal to 2e7 bytes
      if (result.assets[0].size && result.assets[0].size <= 2e7) {
        setUserAccount({
          ...userAccount,
          avatar: result.assets[0],
        });
      } else {
        showAlert({
          message:
            "Exceeded the size limit. Only allow 20MB maximum file sizes",
        });
      }
    }
  };

  const handleOnPress = async () => {
    // Check user id exists, if exists set to account id
    if (userId) {
      setUserAccount({
        ...userAccount,
        accountId: userId,
      });
    } else {
      showAlert({
        message: "User id is missing",
      });
      return;
    }
    // Check phone number exists, if not show alert and exit the function
    if (!userAccount.phone) {
      showAlert({
        message: "Phone number is missing",
      });
      return;
    }

    // Check if fields have values to register
    if (
      userAccount.username === "" ||
      userAccount.email === "" ||
      userAccount.password === "" ||
      userAccount.confirmPassword === ""
    ) {
      showAlert({
        message: "Please fill in all the fields",
      });
      return;
    }

    // Password checking with confirm password
    if (userAccount.password !== userAccount.confirmPassword) {
      showAlert({
        message: "Passwords do not match",
      });
      return;
    }

    try {
      setIsLoading(true);
      // User account creation
      const newUser = await createUserAccount(userAccount);

      if (newUser.$id) {
        // Store the newly created user
        await storeData(keysForStorage.user, newUser);

        showAlert({
          message: "Account setup successfully",
        });

        // Navigate to setup budget screen
        router.push("/setup-budget");
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

  useEffect(() => {
    // Get user account id from session that store in local storage
    (async () => {
      const [session, singedUser] = await Promise.all([
        getStoreData<Models.Session>(keysForStorage.session),
        getSignedInUser(),
      ]);

      if (session) {
        setUserId(session.$id);
      }

      if (singedUser) {
        setUserAccount({
          ...userAccount,
          phone: singedUser.phone,
        });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={defaultStyles.layout}>
      <Text style={styles.title}>Let's setup your user account!</Text>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <FormField
          handleOnChange={(value) => handleOnChange("username", value)}
          label="Username"
          labelShown={false}
          placeholder="Username"
          value={userAccount.username}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("email", value)}
          label="Email"
          labelShown={false}
          placeholder="Email"
          value={userAccount.email}
          keyboardType="email-address"
        />
        <FileUploadPicker
          placeholder="Click here to upload avatar"
          labelShown={false}
          asset={userAccount.avatar}
          callBackFn={openPicker}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("password", value)}
          label="Password"
          labelShown={false}
          placeholder="Password"
          value={userAccount.password}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("confirmPassword", value)}
          label="Confirm Password"
          labelShown={false}
          placeholder="Confirm Password"
          value={userAccount.confirmPassword}
        />
      </View>
      <Button
        title="Create account"
        callbackFn={handleOnPress}
        isLoading={isLoading}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.headerSmall,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imgContainer: {
    width: "100%",
    height: 130,
    backgroundColor: colors.gray[100],
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
