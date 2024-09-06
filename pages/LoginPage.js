import {
  ActivityIndicator,
  Alert,
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
        topOffset: 50,
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
        topOffset: 50,
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
            Don't have an account? <Text>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
