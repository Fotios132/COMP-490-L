import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function SignInScreen({ onBack }: any) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors: { [k: string]: string } = {};

    if (isRegistering && !firstName) {
      newErrors.firstName = "First name required";
      valid = false;
    }

    if (isRegistering && !lastName) {
      newErrors.lastName = "Last name required";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Email required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    Alert.alert("Success", isRegistering ? "Account created" : "Logged in!");

    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GameStart</Text>
      <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {isRegistering ? "Register" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switch}>
          {isRegistering
            ? "Already have an account? Login"
            : "No account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  logo: { color: "#00ffff", fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  title: { color: "#00ffff", fontSize: 22, marginBottom: 20 },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  btn: { backgroundColor: "#00ffff", padding: 12, width: "80%", borderRadius: 8, alignItems: "center" },
  btnText: { color: "#000", fontWeight: "bold" },
  switch: { color: "#00ffff", marginTop: 15 },
});
