import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type Category = "All" | "Games" | "Consoles" | "Accessories";

type Props = {
  category: Category;
  setCategory: (c: Category) => void;
};

export default function CategoryBar({ category, setCategory }: Props) {
  const CATEGORIES: Category[] = ["All", "Games", "Consoles", "Accessories"];

  return (
    <View style={styles.row}>
      {CATEGORIES.map((c) => (
        <TouchableOpacity
          key={c}
          style={[styles.btn, category === c && styles.active]}
          onPress={() => setCategory(c)}
        >
          <Text style={[styles.text, category === c && styles.activeText]}>
            {c}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#111",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  active: {
    backgroundColor: "#00ffff",
  },
  text: {
    color: "#ccc",
  },
  activeText: {
    color: "#000",
    fontWeight: "bold",
  },
});
