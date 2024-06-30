import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type FormFieldProps = {
  label: string | "Confirm Password" | "Password";
  labelShown?: boolean;
  placeholder: string;
  value: string;
  handleOnChange: (text: string) => void;
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "phone-pad"
    | "name-phone-pad"
    | "web-search"
    | "visible-password";
  props?: TextInputProps;
};

export default function FormField({
  label,
  labelShown = true,
  placeholder,
  value,
  handleOnChange,
  keyboardType = "default",
  props,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  return (
    <View>
      {labelShown && <Text style={[styles.label]}>{label}</Text>}
      <View>
        {/* TODO When user click outside of focused input then selected input need to be false */}
        <TextInput
          {...props}
          value={value}
          placeholderTextColor={"gray"}
          placeholder={placeholder}
          onChangeText={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, isFocused && styles.inputFocused]}
          keyboardType={keyboardType}
          selectionColor={colors.primary[100]}
          secureTextEntry={
            (label === "Password" || label === "Confirm Password") &&
            !isTextVisible
          }
        />
        {(label === "Password" || label === "Confirm Password") && (
          <TouchableOpacity
            onPress={() => setIsTextVisible(!isTextVisible)}
            style={{
              position: "absolute",
              right: 10,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={isTextVisible ? "eye" : "eye-off"}
              size={25}
              color={colors.gray[100]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    color: colors.gray[400],
    fontSize: fontSize.text,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray[100],
  },
  inputFocused: {
    borderColor: colors.primary[100],
  },
  label: {
    color: colors.gray[300],
    fontWeight: "600",
  },
});
