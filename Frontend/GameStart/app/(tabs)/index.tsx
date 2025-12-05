import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  const images = {
    videoGames:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    consoles:
      "https://www.billboard.com/wp-content/uploads/2023/07/Marvel-s-Spider-Man-2-Limited-Edition-cr-Sony-billboard-1548.png?w=942&h=628&crop=1",
    accessories:
      "https://assets.xboxservices.com/assets/59/10/5910d098-6cb4-459e-a3bf-10972df27ac7.jpg?n=Xbox-Wireless-Controller_Image-Hero_1084_Blue_1920x831_01.jpg",
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>GameStart</Text>

          {/* SIGN IN */}
          <TouchableOpacity onPress={() => router.push("/signIn")}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          {/* CART */}
          <TouchableOpacity onPress={() => router.push("/cart")}>
            <Text style={styles.cartText}>Cart (0)</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR (Disabled here, opens Search screen) */}
        <TouchableOpacity
          style={{ width: "95%" }}
          onPress={() =>
            router.push({
              pathname: "/search",
              params: { category: "All" },
            })
          }
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Search games, consoles, accessories..."
            placeholderTextColor="#ccc"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      {/* MAIN SCROLL AREA */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.title}>Gear up. Game on.</Text>
        <Text style={styles.subtitle}>Gamers Paradise</Text>

        <View style={styles.cardContainer}>
          {/* CATEGORY CARDS */}
          {[
            { title: "Video Games", key: "videoGames", category: "Games" },
            { title: "Consoles", key: "consoles", category: "Consoles" },
            { title: "Accessories", key: "accessories", category: "Accessories" },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/search",
                  params: { category: item.category },
                })
              }
            >
              <Image source={{ uri: images[item.key] }} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>Tap to explore</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  /* HEADER */
  header: {
    backgroundColor: "#000",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    width: "95%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  logo: {
    color: "#00ffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  signInText: {
    color: "#00ffff",
    fontWeight: "600",
    fontSize: 14,
  },
  cartText: {
    color: "#00ffff",
    fontWeight: "600",
    fontSize: 14,
  },

  /* SEARCH BAR */
  searchBar: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
  },

  /* MAIN CONTENT */
  scrollArea: {
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    color: "#00ffff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    color: "#ccc",
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },

  /* CATEGORY CARDS */
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    width: "90%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardTitle: {
    color: "#00ffff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  cardText: {
    color: "#aaa",
    marginBottom: 10,
  },
});
