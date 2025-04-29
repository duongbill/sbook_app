import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DiscoveryCard from "../../components/DiscoveryCard";

const DiscoveryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Khám Phá</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hiển thị nhiều DiscoveryCard */}
        {Array.from({ length: 10 }).map((_, index) => (
          <DiscoveryCard key={index} />
        ))}

        {/* Gacha button */}
        <TouchableOpacity
          style={styles.gachaButton}
          onPress={() => navigation.navigate("GachaScreen")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="gift-outline"
            size={24}
            color="#333"
            style={styles.gachaIcon}
          />
          <Text style={styles.gachaButtonText}>Quay Gacha</Text>
        </TouchableOpacity>
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
  gachaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1DBCA",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gachaIcon: {
    marginRight: 10,
  },
  gachaButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default DiscoveryScreen;
