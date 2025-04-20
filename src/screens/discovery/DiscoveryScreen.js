import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import DiscoveryCard from "../../components/DiscoveryCard";

const DiscoveryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Khám Phá</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hiển thị nhiều DiscoveryCard */}
        {Array.from({ length: 10 }).map((_, index) => (
          <DiscoveryCard key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center", // Căn giữa toàn bộ nội dung theo chiều ngang
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -40,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // Căn giữa nội dung trong ScrollView
    alignItems: "center", // Căn giữa các item theo chiều ngang
    padding: 16,
    paddingBottom: 100, // Add extra padding at the bottom to prevent menu overlap
  },
});

export default DiscoveryScreen;
