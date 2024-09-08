import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import img1 from "../assets/12.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";

const BookingDetail = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <Header title={"Booking Detail"} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View>
          <Image
            source={img1}
            style={{ width: width, height: 230 }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Waiting you to check in</Text>
        <View style={[styles.statusContainer]}>
          <View style={[styles.miniContainer, { marginBottom: 0 }]}>
            <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={24}
                color="#007BFF"
              />
              <Text style={{ color: "#6C757D" }}>Check in status</Text>
            </View>
            <Text>Pending</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.miniContainer}>
            <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
              {/* <FontAwesome5 name="parking" size={24} color="#007BFF" /> */}
              <MaterialCommunityIcons
                name="parking"
                size={24}
                color="#007BFF"
              />
              <Text style={{ color: "#6C757D" }}>Parking Spot</Text>
            </View>
            <Text>Central Park Mall</Text>
          </View>
          <View style={styles.miniContainer}>
            <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
              {/* <FontAwesome5 name="parking" size={24} color="#007BFF" /> */}
              <MaterialCommunityIcons
                name="home-floor-0"
                size={24}
                color="#007BFF"
              />
              <Text style={{ color: "#6C757D" }}>Floor</Text>
            </View>
            <Text>GF</Text>
          </View>
          <View style={styles.miniContainer}>
            <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
              {/* <FontAwesome5 name="parking" size={24} color="#007BFF" /> */}
              <MaterialCommunityIcons
                name="floor-plan"
                size={24}
                color="#007BFF"
              />
              <Text style={{ color: "#6C757D" }}>Area</Text>
            </View>
            <Text>A-11</Text>
          </View>
          <View style={[styles.miniContainer, { marginBottom: 0 }]}>
            <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={24}
                color="#007BFF"
              />
              <Text style={{ color: "#6C757D" }}>Time</Text>
            </View>
            <Text>09.00pm, 31 Feb 2024</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonCheckin}
          onPress={() =>
            navigation.navigate("ShowQrCode", {
              trxId: "66d70e189827eceb54d1a655",
            })
          }
        >
          <Text style={styles.buttonText}>Checkin Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  statusContainer: {
    backgroundColor: "rgba(208, 208, 208, 0.3)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  miniContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  buttonCheckin: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
