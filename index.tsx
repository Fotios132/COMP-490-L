import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { GlobalCart } from "../globalCart";

export default function App() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>GameStart</Text>

          {/* CART BUTTON */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push("/(tabs)/cart")}
          >
            <Text style={styles.cartText}>Cart ({GlobalCart.length})</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search games..."
          placeholderTextColor="#ccc"
        />
      </View>

      {/* MAIN CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.title}>Gear up. Game on.</Text>
        <Text style={styles.subtitle}>Gamers Paradise</Text>

        {/* 3 CATEGORY CARDS */}
        <View style={styles.cardContainer}>
          {/* VIDEO GAMES */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Image
              source={{
                uri: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Video Games</Text>
            <Text style={styles.cardText}>Tap to explore</Text>
          </TouchableOpacity>

          {/* CONSOLES */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Image
              source={{
                uri: "https://www.billboard.com/wp-content/uploads/2023/07/Marvel-s-Spider-Man-2-Limited-Edition-cr-Sony-billboard-1548.png?w=942&h=628&crop=1",
              }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Consoles</Text>
            <Text style={styles.cardText}>Tap to explore</Text>
          </TouchableOpacity>

          {/* ACCESSORIES */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Image
              source={{
                uri: "https://assets.xboxservices.com/assets/59/10/5910d098-6cb4-459e-a3bf-10972df27ac7.jpg?n=Xbox-Wireless-Controller_Image-Hero_1084_Blue_1920x831_01.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Accessories</Text>
            <Text style={styles.cardText}>Tap to explore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { paddingTop: 40, paddingBottom: 10, alignItems: "center" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
  },
  logo: { color: "#00ffff", fontSize: 28, fontWeight: "bold" },
  cartButton: {
    backgroundColor: "#00ffff",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cartText: { color: "#000", fontWeight: "bold" },
  searchBar: {
    width: "95%",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
  },
  scrollArea: { alignItems: "center", paddingBottom: 40 },
  title: { color: "#00ffff", fontSize: 32, fontWeight: "bold", marginTop: 20 },
  subtitle: { color: "#ccc", marginBottom: 20 },
  cardContainer: { width: "100%", alignItems: "center" },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    width: "90%",
    alignItems: "center",
  },
  image: { width: "100%", height: 150 },
  cardTitle: { color: "#00ffff", fontSize: 18, fontWeight: "bold", marginTop: 8 },
  cardText: { color: "#aaa", marginBottom: 10 },
});
