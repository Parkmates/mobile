import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";

const MidtransView = () => {
  const url = "https://sample-demo-dot-midtrans-support-tools.et.r.appspot.com/snap-redirect/";
  const [loading, setLoading] = useState(true);
  return (
    <View>
        <WebView
          source={{ uri: "https://sample-demo-dot-midtrans-support-tools.et.r.appspot.com/snap-redirect/" }}
        />
    </View>
  );
};

export default MidtransView;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "700",
  },
  webviewWrapper: {
    flex: 1,
    backgroundColor: "red",
  },
  webview: {
    flex: 1,
  },
  oader: {
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
  },
});
