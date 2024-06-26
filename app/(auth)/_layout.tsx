import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(242, 242, 242)",
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign up",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="setup-user-account"
        options={{
          title: "User Account Setup",
        }}
      />
      <Stack.Screen
        name="setup-budget"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
