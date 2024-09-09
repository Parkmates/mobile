import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import img1 from "../assets/12.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import Loading from "../components/Loading";

const BookingDetail = ({ navigation, route }) => {
  const { width } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  // const stat = transaction[0]?.status;

  const dateFormat = (until) => {
    let date = new Date(until).toLocaleDateString("id-ID", {
      timeZone: "Asia/Bangkok",
      dayPeriod: "narrow",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    let dateNumber = new Date(until).getDate();
    let hour = new Date(until).getHours() + 1;
    let minute = new Date(until).getMinutes();

    if (hour > 23 && minute > 0) {
      let newDate = new Date(until).setDate(new Date(until).getDate() + 2);
      date = new Date(newDate).toLocaleDateString("id-ID", {
        timeZone: "Asia/Bangkok",
        dayPeriod: "narrow",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      hour = hour - 24;
    }

    let formatedHours = hour < 10 ? "0" + hour : hour;
    let formatedMinutes = minute < 10 ? "0" + minute : minute;

    return `${formatedHours}:${formatedMinutes}, ${date}`;
  };

  const handleCheckout = async () => {};

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await api({
        url: `api/trx/${route.params.transactionId}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      setTransaction(data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.data.msg,
        });
        console.log(error);
      }
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // console.log(transaction)
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Booking Detail"} onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={{ width: width, flexShrink: 1 }}>
            <Image
              source={img1}
              style={{ width: width - 48, height: 230 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>
            {transaction[0]?.status === "bookingPending" &&
              "Waiting Booking Payment"}
            {transaction[0]?.status === "bookingSuccessfull" &&
              "Waiting you to check in"}
            {transaction[0]?.status === "parking" && "Parking ..."}
            {transaction[0]?.status === "checkoutPending" && "You are ready to checkout"}
          </Text>
          <View style={[styles.statusContainer]}>
            <View style={[styles.miniContainer, { marginBottom: 0 }]}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Status</Text>
              </View>
              <Text>
                {transaction[0]?.status === "bookingPending" &&
                  "Waiting Booking Payment"}
                {transaction[0]?.status === "bookingSuccessfull" &&
                  "Waiting you to check in"}
                {transaction[0]?.status === "parking" && "Parking"}
                {transaction[0]?.status === "checkoutPending" &&
                  "Waiting Payment"}
              </Text>
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
              <Text>{transaction[0]?.parkingSpot?.name}</Text>
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
              <Text>{transaction[0]?.spotDetail?.floor}</Text>
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
              <Text>{transaction[0]?.spotDetail?.area}</Text>
            </View>
            <View style={[styles.miniContainer, { marginBottom: 0 }]}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Check-in Before</Text>
              </View>
              <Text>{dateFormat(transaction[0]?.createdAt)}</Text>
            </View>
          </View>
          {transaction[0]?.status === "bookingSuccessfull" && (
            <TouchableOpacity
              style={styles.buttonCheckin}
              onPress={() =>
                navigation.navigate("ShowQrCode", {
                  trxId: route.params.transactionId,
                })
              }
            >
              <Text style={styles.buttonText}>Check-in Now</Text>
            </TouchableOpacity>
          )}
          {transaction[0]?.status === "bookingPending" && (
            <TouchableOpacity
              style={styles.buttonCheckin}
              onPress={() =>
                navigation.navigate("PaymentPage", {
                  url: transaction[0]?.paymentUrl,
                })
              }
            >
              <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>
          )}
          {transaction[0]?.status === "parking" && (
            <TouchableOpacity
              style={styles.buttonCheckin}
              onPress={handleCheckout}
            >
              <Text style={styles.buttonText}>Checkout Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {loading && <Loading />}
    </View>
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
