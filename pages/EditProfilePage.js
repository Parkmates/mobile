import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../utils/axios";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { TextInput } from "react-native-gesture-handler";
import { authStyles } from "../styles/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import imgProfile from "../assets/profile.png";
import Loading from "../components/Loading";

const width = Dimensions.get("screen").width;

const EditProfilePage = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false)

  const [editUser, setEditUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const onChangeText = (value, field) => {
    setEditUser({ ...editUser, [field]: value });
  };

  const getData = async () => {
    setLoading(true)
    try {
      const { data } = await api({
        url: "/api/users/profile",
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      setEditUser({
        name: data.name,
        username: data.username,
        email: data.email
      });
      setUser(data);
      setLoading(false)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.msg,
      });
      console.log(error);
      setLoading(false)
    }
  };

  const submitHandler = async() => {
    setLoading(true)
    try {
      const { data } = await api({
        method: 'PUT',
        url: `/api/users/${user?._id}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
        data: {
          name: editUser.name,
          username: editUser.username,
          email: editUser.email
        }
      })

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.msg || "Error"
      })
      console.log(error.response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Header title={"Edit Profile"} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: width,
            flexShrink: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={imgProfile}
            style={{ width: width - 48, height: 230 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Personal Information</Text>
          <View>
            <Text style={{ marginLeft: 4 }}>Name</Text>
            <View style={[authStyles.inputView, styles.input]}>
              <TextInput
                keyboardAppearance="dark"
                style={[authStyles.inputText, { flex: 1 }]}
                placeholder="Name"
                placeholderTextColor="#717171"
                value={editUser.name}
                onChangeText={(value) => onChangeText(value, "name")}
              />
              <FontAwesome5 name="user-circle" size={24} color="#6C757D" />
            </View>
          </View>
          <View>
            <Text style={{ marginLeft: 4 }}>Username</Text>
            <View style={[authStyles.inputView, styles.input]}>
              <TextInput
                keyboardAppearance="dark"
                style={[authStyles.inputText, { flex: 1 }]}
                placeholder="Username"
                placeholderTextColor="#717171"
                value={editUser.username}
                onChangeText={(value) => onChangeText(value, "username")}
              />
              <Feather name="user" size={24} color="#6C757D" />
            </View>
          </View>
          <View>
            <Text style={{ marginLeft: 4 }}>Email</Text>
            <TouchableOpacity
              style={[authStyles.inputView, styles.input]}
              onPress={() => {
                Toast.show({
                  type: "info",
                  text1: `Sorry, you can't change email`,
                });
              }}
            >
              <TextInput
                inputMode="email"
                keyboardAppearance="dark"
                style={authStyles.inputText}
                placeholder="Email"
                placeholderTextColor="#717171"
                value={editUser.email}
                editable={false}
                onChangeText={(value) => onChangeText(value, "email")}
              />
              <MaterialIcons name="alternate-email" size={24} color="#6C757D" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  innerContainer: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 24,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 24,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
