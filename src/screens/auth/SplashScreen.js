import React, { useEffect } from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Tự động chuyển sang màn hình đăng nhập sau 5 giây
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../../../assets/ss.png")}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Đổi màu nền thành đen để tránh khoảng trắng nếu hình ảnh không phủ kín
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  splashImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SplashScreen;
