import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Hr from "./Hr";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

const HomeActiveBooking = ({ type }) => {
  return (
    // if empty
    // <TouchableOpacity style={styles.containerEmpty}>
    //   <Text>You havent booking yet.</Text>
    //   <TouchableOpacity style={styles.buttonBookNow}>
    //     <Text style={styles.bookNowText}>Book Now</Text>
    //   </TouchableOpacity>
    // </TouchableOpacity>
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainerTop}>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1661963457416-185db28e96c6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          height={80}
          width={80}
          resizeMode="cover"
          style={{ borderRadius: 10 }}
        />
        <View style={styles.rightContainer}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.name}>Central Park Mall GF</Text>
              {type === "car" ? (
                <Ionicons
                  name="car"
                  size={26}
                  color={"black"}
                />
              ) : (
                <Fontisto
                  name="motorcycle"
                  size={23}
                  color={"black"}
                />
              )}
            </View>
            {/* <Hr pad={8} /> */}
            <View style={styles.addressContainer}>
              <View style={styles.containerAddressInside}>
                <Text style={styles.address}>Vehicle</Text>
                <Text style={styles.address}>Booked for</Text>
                <Text style={styles.address}>Valid Until</Text>
              </View>
              <View style={styles.containerAddressInside}>
                <Text style={styles.address}>:</Text>
                <Text style={styles.address}>:</Text>
                <Text style={styles.address}>:</Text>
              </View>
              <View style={styles.containerAddressInside}>
                <Text style={styles.address}>Motorcycle</Text>
                <Text style={styles.address}>31 February 2024</Text>
                <Text style={styles.address}>09:00 pm</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Hr />
      <TouchableOpacity style={styles.buttonCheckin}>
        <Text style={styles.bookNowText}>Checkin Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default HomeActiveBooking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e2e2",
    padding: 12,
    borderRadius: 12,
  },
  innerContainerTop: {
    flexDirection: "row",
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  address: {
    width: "100%",
    color: "#737373",
    fontSize: 12,
  },
  addressContainer: {
    width: "100%",
    flexDirection: "row",
    // justifyContent: 'space-between'
  },
  buttonCheckin: {
    width: "100%",
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    marginTop: 18,
  },
  containerAddressInside: {
    marginRight: 10,
  },
  containerEmpty: {
    backgroundColor: "#e2e2e2",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 190,
  },
  buttonBookNow: {
    width: "50%",
    backgroundColor: "#007bff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    marginTop: 18,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 12,
  },
});
