import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function SignUpScreen() {
  return (
    <SafeAreaView style={defaultStyles.layout}>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <FormField
          handleOnChange={() => {}}
          label="Name"
          labelShown={false}
          placeholder="Name"
          value=""
        />
        <FormField
          handleOnChange={() => {}}
          label="Phone"
          labelShown={false}
          placeholder="Phone"
          value=""
          keyboardType="phone-pad"
        />
        <FormField
          handleOnChange={() => {}}
          label="Password"
          labelShown={false}
          placeholder="Password"
          value=""
          keyboardType="visible-password"
        />
        <FormField
          handleOnChange={() => {}}
          label="Confirm Password"
          labelShown={false}
          placeholder="Confirm Password"
          value=""
          keyboardType="visible-password"
        />
      </View>
      <Button title="Sign Up" />

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
          Already have an account?{" "}
        </Text>
        <Link
          style={{
            color: colors.primary[100],
          }}
          href={"/login"}
        >
          Login here!
        </Link>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
