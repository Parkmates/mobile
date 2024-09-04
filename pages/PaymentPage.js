import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import WebView from "react-native-webview";

const PaymentPage = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const url = "https://youtube.com"

  const handleNavigationChange = (navState) => {
    const { url } = navState;

    // Cek apakah URL mengindikasikan transaksi berhasil
    if (url.includes("Jess")) {
      // Tutup WebView
    //   setIsOpen(false);
      // Arahkan ke halaman sukses atau lainnya
      navigation.navigate("TabNavigator");
    }
  };
  return (
    <View style={styles.container}>
      <Header title={"Payment"} onPress={() => navigation.goBack()} />
      <WebView
        source={{
          uri: url
        }}
        onLoad={() => setLoading(false)}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        cacheMode="LOAD_NO_CACHE"
        onNavigationStateChange={handleNavigationChange}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
  },
});
