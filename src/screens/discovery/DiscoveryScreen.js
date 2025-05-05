import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DiscoveryCard from "../../components/DiscoveryCard";
import { ThemeContext } from "../../context/ThemeContext";
import { getDiscoveryCards } from "../../api/api";

const DiscoveryScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [discoveryCards, setDiscoveryCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscoveryCards = async () => {
      try {
        const data = await getDiscoveryCards();
        setDiscoveryCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching discovery cards:", error);
        setLoading(false);
      }
    };

    fetchDiscoveryCards();
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />
      <Text style={[styles.title, { color: theme.colors.text }]}>Khám Phá</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Đang tải bài viết...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {discoveryCards.map((card) => (
            <DiscoveryCard
              key={card.id}
              title={card.title}
              description={card.description}
              image={{ uri: card.image }}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10, // Thêm 10px vào paddingTop
    alignItems: "center", // Căn giữa toàn bộ nội dung theo chiều ngang
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10, // Giảm marginTop để bù lại phần paddingTop đã tăng
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default DiscoveryScreen;
