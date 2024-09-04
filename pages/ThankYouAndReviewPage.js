import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import LottieView from "lottie-react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
export default function ThankYouAndReviewPage() {
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <LottieView
          style={{ width: 150, height: 150 }}
          source={require("../assets/success.json")}
          autoPlay
          loop
        />
        <AirbnbRating count={5} defaultRating={5} size={25} />
      </View>
    </View>
  );
}
