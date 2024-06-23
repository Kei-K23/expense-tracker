import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React from "react";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";

type HeroSectionCardProps = {
  image: ImageProps;
  title: string;
  description: string;
};

export default function HeroSectionCard({
  image,
  title,
  description,
}: HeroSectionCardProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  title: {
    fontSize: fontSize.header,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: fontSize.text,
    color: colors.gray[400],
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 280,
    marginBottom: 20,
  },
});
