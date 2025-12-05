import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { GlobalCart } from "../globalCart";

type StoreItem = {
  id: number;
  name: string;
  price: number;
  image: any; // string URL or require()
  type: "Games" | "Consoles" | "Accessories";
};

export default function SearchScreen() {
  const [games, setGames] = useState<StoreItem[]>([]);
  const [consoles, setConsoles] = useState<StoreItem[]>([]);
  const [accessories, setAccessories] = useState<StoreItem[]>([]);
  const [items, setItems] = useState<StoreItem[]>([]);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = "c1db19e921334df6accd48b12d95fb5a";
  const { width } = Dimensions.get("window");
  const cardWidth = width / 2 - 20;

  // FETCH GAMES FROM RAWG API
  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=30`)
      .then((res) => res.json())
      .then((data) => {
        const list: StoreItem[] = data.results.map((g: any) => ({
          id: g.id,
          name: g.name,
          price: Math.floor(Math.random() * 50 + 10),
          image: g.background_image, // STRING
          type: "Games",
        }));
        setGames(list);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Static consoles
  useEffect(() => {
    setConsoles([
      {
        id: 201,
        name: "PlayStation 5",
        price: 499.99,
        image: require("../../assets/images/ps5.png"),
        type: "Consoles",
      },
      {
        id: 202,
        name: "Xbox Series X",
        price: 499.99,
        image: require("../../assets/images/xboxx.png"),
        type: "Consoles",
      },
      {
        id: 203,
        name: "Nintendo Switch",
        price: 299.99,
        image: require("../../assets/images/switch1.png"),
        type: "Consoles",
      },
    ]);
  }, []);

  // Static accessories
  useEffect(() => {
    setAccessories([
      {
        id: 301,
        name: "PS5 Controller",
        price: 49.99,
        image: require("../../assets/images/ps5controller.png"),
        type: "Accessories",
      },
      {
        id: 302,
        name: "Switch Joy-Cons",
        price: 69.99,
        image: require("../../assets/images/switch1joycons.png"),
        type: "Accessories",
      },
      {
        id: 303,
        name: "Kirby Plush",
        price: 25.99,
        image: require("../../assets/images/kirbysplushy.png"),
        type: "Accessories",
      },
    ]);
  }, []);

  // FILTER ITEMS
  useEffect(() => {
    let allItems: StoreItem[] = [...games, ...consoles, ...accessories];

    if (category !== "All") {
      allItems = allItems.filter((item) => item.type === category);
    }

    if (search.trim() !== "") {
      allItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setItems(allItems);
  }, [search, category, games, consoles, accessories]);

  // RENDER EACH ITEM — FIXED FOR WEB SUPPORT
  const renderItem = ({ item }: { item: StoreItem }) => {
    const isStringImage = typeof item.image === "string";

    return (
      <View style={[styles.card, { width: cardWidth }]}>
        <Image
          source={isStringImage ? { uri: item.image } : item.image}
          style={styles.cardImage}
        />

        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>

        {/* ADD TO CART BUTTON */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            GlobalCart.push({
              name: item.name,
              price: item.price,
              image: isStringImage ? item.image : "", // safe
            });

            router.push("/(tabs)/cart");
          }}
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ffff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading items...</Text>
      </View>
    );
  }

  // MAIN UI
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>GameStart</Text>

          <TouchableOpacity onPress={() => router.push("/(tabs)/cart")}>
            <Text style={styles.cartBtnText}>Cart ({GlobalCart.length})</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search games, consoles, accessories..."
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* CATEGORY FILTER */}
      <View style={styles.filterRow}>
        {["All", "Games", "Consoles", "Accessories"].map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.filterButton,
              category === c && styles.activeFilter,
            ]}
            onPress={() => setCategory(c)}
          >
            <Text
              style={[
                styles.filterText,
                category === c && styles.activeFilterText,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ITEM GRID */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  loading: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#000",
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
  },

  navbar: {
    width: "95%",
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#00ffff",
    fontSize: 26,
    fontWeight: "bold",
  },

  cartBtnText: {
    color: "#00ffff",
    fontSize: 14,
    fontWeight: "600",
  },

  searchInput: {
    width: "95%",
    backgroundColor: "#222",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginTop: 10,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  filterButton: {
    backgroundColor: "#111",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal: 5,
  },

  activeFilter: {
    backgroundColor: "#00ffff",
  },

  filterText: {
    color: "#ccc",
  },

  activeFilterText: {
    color: "#000",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    alignItems: "center",
  },

  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },

  cardTitle: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "bold",
    textAlign: "center",
  },

  price: {
    color: "#00ffff",
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 16,
  },

  cartButton: {
    backgroundColor: "#00ffff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },

  cartText: {
    color: "#000",
    fontWeight: "bold",
  },
});
