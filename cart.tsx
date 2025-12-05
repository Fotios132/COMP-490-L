import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { GlobalCart } from "../globalCart";

export default function CartScreen() {
  const [paymentMethod, setPaymentMethod] = useState<"none" | "debit" | "credit">("none");

  // Calculate totals
  const subtotal = GlobalCart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  // DELETE ITEM
  const deleteItem = (index: number) => {
    GlobalCart.splice(index, 1);
    router.replace("/(tabs)/cart"); // reload the cart
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {/* IF CART EMPTY */}
      {GlobalCart.length === 0 && (
        <Text style={styles.empty}>Your cart is empty.</Text>
      )}

      {/* CART ITEMS */}
      {GlobalCart.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>

          {/* DELETE BUTTON */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteItem(index)}
          >
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* CHECKOUT SECTION */}
      {GlobalCart.length > 0 && (
        <View style={styles.checkoutBox}>
          <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text style={styles.tax}>Tax (10%): ${tax.toFixed(2)}</Text>
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

          {/* SELECT PAYMENT METHOD */}
          {paymentMethod === "none" && (
            <>
              <Text style={styles.choose}>Choose Payment Method:</Text>

              <TouchableOpacity
                style={styles.payButton}
                onPress={() => setPaymentMethod("debit")}
              >
                <Text style={styles.payText}>Debit Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.payButton}
                onPress={() => setPaymentMethod("credit")}
              >
                <Text style={styles.payText}>Credit Card</Text>
              </TouchableOpacity>
            </>
          )}

          {/* PAYMENT FORM */}
          {(paymentMethod === "debit" || paymentMethod === "credit") && (
            <>
              <Text style={styles.methodTitle}>
                {paymentMethod === "debit" ? "Debit Card Info" : "Credit Card Info"}
              </Text>

              <TextInput style={styles.input} placeholder="Card Number" placeholderTextColor="#ccc" />
              <TextInput style={styles.input} placeholder="Name on Card" placeholderTextColor="#ccc" />
              <TextInput style={styles.input} placeholder="Expiration Date" placeholderTextColor="#ccc" />
              <TextInput style={styles.input} placeholder="CVV" placeholderTextColor="#ccc" />

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => alert("Order Completed!")}
              >
                <Text style={styles.checkoutText}>Complete Purchase</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000", padding: 15 },
  title: { color: "#00ffff", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  empty: { color: "#ccc", textAlign: "center", marginTop: 20, fontSize: 16 },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  itemName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  itemPrice: { color: "#00ffff", fontSize: 14, marginTop: 2 },

  deleteButton: {
    backgroundColor: "red",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },

  checkoutBox: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  subtotal: { color: "#ccc", fontSize: 16 },
  tax: { color: "#ccc", fontSize: 16 },
  total: { color: "#00ffff", fontSize: 20, fontWeight: "bold", marginTop: 10 },

  choose: { color: "#fff", marginTop: 20, marginBottom: 10, textAlign: "center" },

  payButton: {
    backgroundColor: "#00ffff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  payText: { textAlign: "center", color: "#000", fontWeight: "bold" },

  methodTitle: { color: "#00ffff", fontSize: 18, marginTop: 20, marginBottom: 10 },

  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  checkoutButton: {
    backgroundColor: "#00ffff",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },

  checkoutText: { color: "#000", textAlign: "center", fontWeight: "bold" },
});
