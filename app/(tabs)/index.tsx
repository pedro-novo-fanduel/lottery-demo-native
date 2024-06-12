import { StyleSheet, Platform, PermissionsAndroid } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const webView = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission to access location was denied");
          return;
        }
      } else {
        let res = await Location.requestForegroundPermissionsAsync();
        console.log({ res });
        if (res.status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
      }
    })();
  }, []);

  return (
    <WebView
      ref={webView}
      style={styles.container}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      geolocationEnabled={true}
      cacheEnabled={false}
      source={{ uri: "http://192.168.1.211:3000" }}
      onMessage={(event) => console.log(event.nativeEvent.data)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
