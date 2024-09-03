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

const ProfilePage = () => {
  return (
    <View style={globalStyles.container}>
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
          style={{ width: 80, height: 80, borderRadius: 20 }}
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
            <Text style={{ fontSize: 20 }}>Febrianto Permana</Text>
            <Text style={{ fontSize: 13 }}>Yoga@mail.com</Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#007BFF",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* PARKING HISTORY */}
      <Text style={{ fontSize: 15, fontWeight: "bold", padding: 20 }}>
        Parking History
      </Text>
      <ScrollView style={{ marginBottom: 80 }}>
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
        <ParkingHistory />
      </ScrollView>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({});
