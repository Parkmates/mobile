import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import WebView from "react-native-webview";

const PaymentPage = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);

  const url = route.params.url || "https://youtube.com"

  const handleNavigationChange = (navState) => {
    const { url } = navState;

    // Cek apakah URL mengindikasikan transaksi berhasil
    if (url.includes("done")) {
      // Tutup WebView
    //   setIsOpen(false);
      // Arahkan ke halaman sukses atau lainnya
      navigation.replace('TabNavigator', { screen: 'Book' });
    }
  };
  return (
    <View style={styles.container}>
      <Header title={"Payment"} onPress={() => navigation.replace('TabNavigator', { screen: 'Book' })} />
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
