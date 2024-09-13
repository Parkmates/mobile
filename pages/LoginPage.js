import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { authStyles } from "../styles/auth";
import { useState } from "react";
import { api } from "../utils/axios";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/Auth";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import logo from "../assets/logo.png";

export default function LoginPage({ navigation }) {
  // const { setIsLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeText = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      // console.log(formData);
      const { data } = await api({
        method: "POST",
        url: "/api/login",
        data: JSON.stringify(formData),
      });
      // console.log(data);
      await SecureStore.setItemAsync("access_token", data.access_token);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login Success",
      });
      navigation.replace("TabNavigator");
    } catch (error) {
      // Alert.alert("Opps...", error.message, [
      //   { text: "OK", onPress: () => console.log("OK Pressed") },
      // ]);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.msg,
      });
      // console.log(error.response.data.msg);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={authStyles.container}>
        <View style={{ width: "100%", height: 100 }}>
          <Image
            source={logo}
            resizeMode="contain"
            style={{ flexShrink: 1, width: "70%" }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Welcome Back!
          </Text>
          <Text style={{ fontSize: 12, color: "#717171" }}>
            Log in to find the best parking spots near you. Book, pay, and park
            effortlessly with just a few taps. Join us for a stress-free parking
            experience.
          </Text>
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            inputMode="email"
            style={authStyles.inputText}
            placeholder="Email"
            placeholderTextColor="#717171"
            value={formData.email}
            keyboardAppearance="dark"
            onChangeText={(value) => onChangeText(value, "email")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            style={authStyles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#717171"
            value={formData.password}
            keyboardAppearance="dark"
            onChangeText={(value) => onChangeText(value, "password")}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={authStyles.submitBtn}>
          <Text style={{ color: "white" }}>
            {/* {loading ? (
              <ActivityIndicator size="small" color="#101010" />
            ) : (
              "Login"
            )} */}
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>
            Don't have an account? <Text style={{ color: '#007BFF' }}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
