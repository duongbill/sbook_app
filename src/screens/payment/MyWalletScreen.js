import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Banner from "../../components/Banner";
import { ThemeContext } from "../../context/ThemeContext";

const MyWalletScreen = ({ navigation }) => {
  const [showBalance, setShowBalance] = useState(false);
  const { theme } = useContext(ThemeContext);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Ví của tôi
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Thông tin người dùng */}
      <View
        style={[
          styles.profileContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Image
          source={require("../../../assets/db.png")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            Nguyễn Hải Dương
          </Text>
          <TouchableOpacity onPress={toggleBalance}>
            <View style={styles.balanceRow}>
              <Text
                style={[styles.balance, { color: theme.colors.textSecondary }]}
              >
                Số dư: {showBalance ? "0đ" : "*******"}
              </Text>
              <Ionicons
                name={showBalance ? "eye-outline" : "eye-off-outline"}
                size={18}
                color="gray"
                style={{ marginLeft: 5 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tiện ích */}
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Tiện ích
      </Text>
      <View style={styles.utilitiesContainer}>
        <TouchableOpacity
          style={styles.utilityItem}
          onPress={() => navigation.navigate("deposit")}
        >
          <Ionicons name="cash-outline" size={24} color={theme.colors.text} />
          <Text style={[styles.utilityText, { color: theme.colors.text }]}>
            Nạp tiền
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.utilityItem}
          onPress={() => navigation.navigate("history")}
        >
          <Ionicons name="time-outline" size={24} color={theme.colors.text} />
          <Text style={[styles.utilityText, { color: theme.colors.text }]}>
            Lịch sử
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.utilityItem}>
          <Ionicons
            name="diamond-outline"
            size={24}
            color={theme.colors.text}
          />
          <Text style={[styles.utilityText, { color: theme.colors.text }]}>
            VIP
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gợi ý */}
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Có thể bạn quan tâm
      </Text>
      <View style={styles.bannerContainer}>
        <Banner uri="https://drive.google.com/uc?id=1r24aEMkFitpoK9aW_X6uyCR4IivKEe3S" />
        <Banner uri="https://drive.google.com/uc?id=1IK6-wAw6-qZPfUADbfILbs3aZQq_UPU2" />
        <Banner uri="https://drive.google.com/uc?id=1tb8_Ke1VClTzxPoE24RyW7dulzG2KsDx" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 200,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileContainer: {
    backgroundColor: "#FFF3CF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  balance: {
    fontSize: 14,
    color: "gray",
  },
  utilitiesContainer: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
  },
  utilityItem: {
    alignItems: "center",
    width: 80,
  },
  utilityText: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bannerContainer: {
    gap: 0,
  },
});

export default MyWalletScreen;
