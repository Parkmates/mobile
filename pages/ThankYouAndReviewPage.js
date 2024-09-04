import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/global";
import LottieView from "lottie-react-native";
import { Rating } from "react-native-ratings";
import { useState } from "react";
import { authStyles } from "../styles/auth";
export default function ThankYouAndReviewPage({ navigation }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleSubmit = () => {
    Keyboard.dismiss();
    navigation.navigate("TabNavigator", {
      screen: "Home",
    });
    console.log(rating, review);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={83}
    >
      <View style={globalStyles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 50,
          }}
        >
          <View
            style={{
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
            <Rating
              count={5}
              size={25}
              startingValue={5}
              minValue={1}
              onFinishRating={setRating}
            />
          </View>
          <View style={{ alignItems: "center", gap: 10, width: "80%" }}>
            <Text>Tell us about your experience</Text>
            <TextInput
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#F3F4F5",
                borderRadius: 10,
                height: 150,
              }}
              multiline
              numberOfLines={4}
              placeholder="I enjoyed the service"
              value={review}
              onChangeText={setReview}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={authStyles.submitBtn}
            >
              <Text style={{ color: "white" }}>
                {/* {loading ? (
              <ActivityIndicator size="small" color="#101010" />
            ) : (
              "Login"
            )} */}
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
