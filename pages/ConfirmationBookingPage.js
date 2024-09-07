import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Hr from "../components/Hr";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MidtransView from "../components/MidtransView";
import WebView from "react-native-webview";

const ConfirmationBookingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        title={"Booking Confirmation"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.containerBottom}>
        <Text style={styles.amount}>Amount</Text>
        <Text style={styles.amountNumber}>Rp. 15.000</Text>
        <Hr pad={16} />
        <View style={styles.containerDescription}>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Parking Spot
            </Text>
            <Text style={styles.rightDescription}>Central Park Mall GF</Text>
          </View>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Floor
            </Text>
            <Text style={styles.rightDescription}>5</Text>
          </View>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Area
            </Text>
            <Text style={styles.rightDescription}>A1</Text>
          </View>
          {/* <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { }]}>Address</Text>
            <Text style={[styles.rightDescription, { width: 50 }]}></Text>
            <Text style={styles.rightDescription}>Jalan BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBlaBlaBlaBlaBla</Text>
          </View> */}
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Time
            </Text>
            <Text style={styles.rightDescription}>
              09:00 pm, 31 February, 2024
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PaymentPage')}>
          <Text style={styles.btnText}>Continue to Payment</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View>
            <Text
              style={[
                styles.leftDescription,
                {
                  textAlign: "center",
                  marginBottom: 24,
                  textDecorationLine: "underline",
                },
              ]}
            >
              Important Information
            </Text>
            <View style={styles.containerDescriptionDetail}>
              <View style={styles.containerLeft}>
                <Text style={styles.leftDescription}>Booking Rate</Text>
                <Text style={styles.leftDescription}>Hourly Rate</Text>
              </View>
              <View style={styles.containerRight}>
                <Text style={styles.leftDescription}>Rp. 15.000</Text>
                <Text style={styles.leftDescription}>Rp. 10.000</Text>
              </View>
            </View>
            <Hr pad={24} />
            <Text style={[styles.leftDescription, { textAlign: "center" }]}>
              Please do not leave your belongings in the vehicle, be responsible
              for your belongings. Any loss will be the responsibility of the
              vendor.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConfirmationBookingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  amount: {
    fontSize: 16,
    color: "#737373",
  },
  amountNumber: {
    fontSize: 32,
    fontWeight: "700",
  },
  containerDescription: {
    gap: 6,
    width: "100%",
  },
  containerDescriptionDetail: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  containerLeft: {
    gap: 4,
  },
  containerRight: {
    gap: 4,
    alignItems: "flex-end",
  },
  leftDescription: {
    fontSize: 16,
    color: "#737373",
  },
  rightDescription: {
    fontSize: 16,
    textAlign: "right",
  },
  btn: {
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 24,
  },
  btnText: {
    color: "#fff",
  },
  infoContainer: {
    borderColor: "#e2e2e2",
    borderWidth: 1,
    padding: 24,
    borderRadius: 10,
  },
  BottomSheet: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  
});
