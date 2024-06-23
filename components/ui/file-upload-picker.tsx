import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { Ionicons } from "@expo/vector-icons";
import { DocumentPickerAsset } from "expo-document-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FileUploadPickerProps = {
  callBackFn: () => void;
  asset: DocumentPickerAsset | null | undefined;
  labelShown?: boolean;
  label?: string;
  placeholder: string;
};

export default function FileUploadPicker({
  callBackFn,
  asset,
  labelShown = true,
  label,
  placeholder,
}: FileUploadPickerProps) {
  return (
    <View>
      {labelShown && (
        <Text
          style={{
            color: colors.gray[300],
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={callBackFn}
        style={{
          marginVertical: 10,
        }}
      >
        {asset ? (
          <Image
            source={{ uri: asset.uri }}
            resizeMode="contain"
            style={[styles.imgContainer]}
          />
        ) : (
          <View>
            <View style={[styles.imgContainer]}>
              <Ionicons
                name="cloud-upload"
                resizeMode="contain"
                size={30}
                color={colors.gray[400]}
              />
              <Text
                style={{
                  marginTop: 5,
                  color: colors.gray[400],
                  fontSize: fontSize.textSmall,
                  fontWeight: "600",
                }}
              >
                {placeholder}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
