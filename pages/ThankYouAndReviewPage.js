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
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";

export default function ThankYouAndReviewPage({ navigation, route }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const spotId = route.params.spotId;

  const postReview = async () => {
    setLoading(true)
    try {
      if (review === "" || rating === 0) {
        Toast.show({
          type: "info",
          text1: "Rating or Review should have a value",
        });
        setLoading(false)
        return;
      }

      const { data } = await api({
        method: 'POST',
        url: '/api/reviews',
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
        data: {
          spotId: spotId,
          rating: rating,
          comment: review
        }
      })
      navigation.replace('TabNavigator')
      setLoading(false)
    } catch (error) {
      Toast.show({
        type: "info",
        text1: "Error",
        text2: error.response.data.msg
      });
      console.log(error)
      setLoading(false)
    }
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
              onPress={postReview}
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
      {loading && <Loading/>}
    </KeyboardAvoidingView>
  );
}
