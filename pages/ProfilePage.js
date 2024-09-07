import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";
import ParkingHistory from "../components/ParkingHistory";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SecureStore from "expo-secure-store";

const ProfilePage = ({ navigation }) => {
  return (
    <View style={[globalStyles.container, { padding: 24 }]}>
      <View
        style={{
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Image
          style={{ width: 100, height: 100, borderRadius: 20 }}
          source={{
            uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Febrianto Permana
            </Text>
            {/* <Text style={{ fontSize: 13 }}>Yoga@mail.com</Text> */}
          </View>
          {/* <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#007BFF",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* PARKING HISTORY */}
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Personal Infromation
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <FontAwesome6 name="edit" size={16} color="#007BFF" />
          <Text style={{ color: "#007BFF" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 12,
          backgroundColor: "#eaeaea",
          borderRadius: 10,
          gap: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Fontisto name="email" size={24} color="#6C757D" />
            <Text>Email</Text>
          </View>
          <Text style={{ color: '#6C757D' }} >febri@mail.com</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <FontAwesome name="user-o" size={24} color="#6C757D" />
            <Text>Username</Text>
          </View>
          <Text style={{ color: '#6C757D' }} >Febri1000</Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Action</Text>
      </View>
      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "#eaeaea", borderRadius: 10 }}
        onPress={() => {
          SecureStore.deleteItemAsync('access_token');
          navigation.replace('Splash')
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AntDesign name="logout" size={24} color="#6C757D" />
            <Text>Logout</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="#007BFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({});
