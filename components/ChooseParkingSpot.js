import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

const ChooseParkingSpot = ({
  type,
  onPress,
  floor,
  area,
  fee,
  spot,
  vehicle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: type === "active" ? "#007BFF" : "#D9D9D9" },
      ]}
    >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text
          style={[styles.title, { color: type === "active" ? "#fff" : "#000" }]}
        >
          Lantai {floor}
        </Text>
        {vehicle === "car" ? (
          <Ionicons
            name="car"
            size={26}
            color={type === "active" ? "#fff" : "black"}
          />
        ) : (
          <Fontisto
            name="motorcycle"
            size={23}
            color={type === "active" ? "#fff" : "black"}
          />
        )}
      </View>
      <View style={styles.additional}>
        <Text style={{ color: type === "active" ? "#fff" : "#6C757D" }}>
          Area {area}
        </Text>
        <Text style={{ color: type === "active" ? "#fff" : "#6C757D" }}>
          Rp. {fee}/hour
        </Text>
        <Text style={{ color: type === "active" ? "#fff" : "#6C757D" }}>
          {spot} Spot Available
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChooseParkingSpot;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  additional: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: 'wrap'
  },
});
