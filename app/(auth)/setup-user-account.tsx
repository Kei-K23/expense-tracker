import Button from "@/components/ui/button";
import FileUploadPicker from "@/components/ui/file-upload-picker";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { defaultStyles, fontSize } from "@/constants/Style";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { UserType } from "@/types";
import { getDocumentAsync } from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SetupUserAccountScreen() {
  const showAlert = useShowErrorAlert();

  const [userAccount, setUserAccount] = useState<UserType>({
    username: "",
    email: "",
    phone: "",
    password: "",
    avatar: null,
    accountId: "",
  });

  const handleOnChange = (field: keyof UserType, value: string) => {
    setUserAccount((prevState) => ({
      ...prevState,
      [field]: value,
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
          handleOnChange={(value) => handleOnChange("password", value)}
          label="Confirm Password"
          labelShown={false}
          placeholder="Confirm Password"
          value={userAccount.password}
        />
      </View>
      <Button title="Create account" />
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
