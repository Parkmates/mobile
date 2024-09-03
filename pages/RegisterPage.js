import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { authStyles } from "../styles/auth";
export default function RegisterPage({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const onChangeText = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);

      formData.name = "";
      formData.username = "";
      formData.email = "";
      formData.password = "";

      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Opps...", error.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={authStyles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Create account
          </Text>
          <Text style={{ fontSize: 12, color: "#717171" }}>
            Sign up to access convenient parking solutions anytime, anywhere.
            Join us and enjoy a hassle-free parking experience.
          </Text>
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            keyboardAppearance="dark"
            style={authStyles.inputText}
            placeholder="Name"
            placeholderTextColor="#717171"
            value={formData.name}
            onChangeText={(value) => onChangeText(value, "name")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            keyboardAppearance="dark"
            style={authStyles.inputText}
            placeholder="Username"
            placeholderTextColor="#717171"
            value={formData.username}
            onChangeText={(value) => onChangeText(value, "username")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            inputMode="email"
            keyboardAppearance="dark"
            style={authStyles.inputText}
            placeholder="Email"
            placeholderTextColor="#717171"
            value={formData.email}
            onChangeText={(value) => onChangeText(value, "email")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            keyboardAppearance="dark"
            style={authStyles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#717171"
            value={formData.password}
            onChangeText={(value) => onChangeText(value, "password")}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={authStyles.submitBtn}>
          <Text style={{ color: "white" }}>
            Register
            {/* {loading ? (
              <ActivityIndicator size="small" color="#101010" />
            ) : (
              "Register"
            )} */}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>
            Already have an account? <Text>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
