import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";

export default function QrCodePage({ navigation }) {
  const route = useRoute();
  const { trxId, type, spotId } = route.params;

  return (
    <View
      style={[
        globalStyles.container,
        {
          padding: 20,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Scan the QR code to enter the parking area.
        </Text>
        <View
          style={{
            gap: 20,
            alignItems: "center",
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <QRCode size={230} value={trxId} />
          <Text style={{ fontWeight: "bold" }}>ParkMate</Text>
        </View>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Check your booking history to view this QR code again.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          type ? navigation.navigate('ThankYouAndReview', { spotId: spotId }) : navigation.replace("TabNavigator", { screen: "Book" });
        }}
        style={{
          width: "100%",
          backgroundColor: "#007BFF",
          borderRadius: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
