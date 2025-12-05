import { Tabs } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider, useCart } from "../../context/CartContext";


function CartTabIcon({ color, size }: { color: string; size: number }) {
  const { items } = useCart();

  const count = items.reduce(
    (sum: number, i: { quantity: number }) => sum + i.quantity,
    0
  ); // ✅ FIXED TYPES

  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons name="cart" size={size} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <CartProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color, size }) => (
              <CartTabIcon color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: "#00ffff",
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 10,
  },
});
