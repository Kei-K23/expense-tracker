import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

type FormSwitchFieldProps = {
  label: string;
  description?: string;
  labelShown?: boolean;
  value: boolean;
  handleOnChange: (text: string) => void;
};

export default function FormSwitchField({
  label,
  description,
  labelShown = true,
  value,
  handleOnChange,
}: FormSwitchFieldProps) {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(value);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={[styles.container]}>
      {labelShown && (
        <View>
          <Text style={[styles.label]}>{label}</Text>
          {description && (
            <Text style={[styles.description]}>{description}</Text>
          )}
        </View>
      )}
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  label: {
    fontSize: fontSize.text,
    fontWeight: "600",
  },
  description: {
    fontWeight: "600",
    color: colors.gray[400],
    width: "80%",
  },
});
