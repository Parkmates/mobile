import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ParkingHistory() {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          borderBottomWidth: 0.5,
          paddingVertical: 15,
          borderColor: "#323232",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#F3F4F5",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons name="car" size={30} />
            </View>
            <View>
              <Text>Nama Parkir</Text>
              <Text style={{ fontSize: 12, color: "#6c757d" }}>
                Monday, 4:00 am
              </Text>
            </View>
          </View>
          <Text>$ -25.000</Text>
        </View>
      </View>
    </View>
  );
}
