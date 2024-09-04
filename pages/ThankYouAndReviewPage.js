import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import LottieView from "lottie-react-native";
export default function ThankYouAndReviewPage() {
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{ width: 200, height: 200 }}
          source={require("../assets/success.json")}
          autoPlay
          loop
        />
        <Text>Thank you for your review</Text>
      </View>
    </View>
  );
}
