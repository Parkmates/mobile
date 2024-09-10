import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function ParkingHistory({
  name,
  time,
  type,
  book,
  pay,
  status,
}) {
  return (
    <View style={{ paddingHorizontal: 24 }}>
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
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {type === "car" ? (
                <Ionicons name="car" size={30} />
              ) : (
                <Fontisto name="motorcycle" size={30} />
              )}
            </View>
            <View>
              <Text>{name}</Text>
              <Text style={{ fontSize: 12, color: "#6c757d" }}>
                {new Date(time).toLocaleDateString("id-ID", {
                  timeZone: "Asia/Bangkok",
                  dayPeriod: "narrow",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>
          {status === "cancelled" || status === "failed" ? (
            <Text style={{ color: 'red' }}>{status === "cancelled" ? "CancelLed" : "Failed"}</Text>
          ) : (
            <Text>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(book + pay)}
            </Text>
          )}
          {/* <Text>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(book + pay)}
          </Text> */}
        </View>
      </View>
    </View>
  );
}
