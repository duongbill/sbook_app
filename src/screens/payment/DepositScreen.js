import React, { useState, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../../context/ThemeContext";

const DepositScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: "none" } });

      return () => {
        parent?.setOptions({
          tabBarStyle: {
            backgroundColor: theme.colors.bottomTabColor,
            borderRadius: 20,
            position: "absolute",
            bottom: 15,
            marginHorizontal: 10,
            padding: 10,
            paddingTop: 5,
            height: 65,
          },
        });
      };
    }, [navigation, theme])
  );

  const [amount, setAmount] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  const predefinedAmounts = [
    "50.000đ",
    "100.000đ",
    "200.000đ",
    "500.000đ",
    "1.000.000đ",
    "2.000.000đ",
  ];

  const handleAmountPress = (value) => {
    setAmount(value.replace("đ", "").replace(/\./g, ""));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundSecondary },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Nạp tiền
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.background }]}>
        <View style={styles.walletContainer}>
          {/* User Info */}
          <View
            style={[
              styles.profileContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Image
              source={{ uri: "https://placehold.co/40x60/png" }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.colors.text }]}>
                Vũ Nguyễn Duy Anh
              </Text>
              <TouchableOpacity onPress={toggleBalance}>
                <View style={styles.balanceRow}>
                  <Text
                    style={[
                      styles.balance,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Số dư: {showBalance ? "0đ" : "*******"}
                  </Text>
                  <Ionicons
                    name={showBalance ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color={theme.colors.textSecondary}
                    style={{ marginLeft: 5 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TextInput
          style={[styles.input, { borderColor: theme.colors.border }]}
          keyboardType="numeric"
          placeholder="Số tiền cần nạp"
          placeholderTextColor={theme.colors.textSecondary}
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.amountButtons}>
          {predefinedAmounts.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.amountButton,
                {
                  backgroundColor: theme.colors.border,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                },
              ]}
              onPress={() => handleAmountPress(item)}
            >
              <Text style={{ color: theme.colors.text }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.securityInfo,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text
            style={[styles.securityText, { color: theme.colors.textSecondary }]}
          >
            An toàn tài sản & Bảo mật thông tin của bạn là ưu tiên hàng đầu của
            chúng tôi.
          </Text>
          <TouchableOpacity>
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              Tìm hiểu thêm {">"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.depositButton,
          {
            backgroundColor:
              amount === "" ? theme.colors.border : theme.colors.primary,
          },
        ]}
        disabled={amount === ""}
      >
        <Text style={styles.depositButtonText}>Nạp tiền</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
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
  card: {
    borderRadius: 16,
    padding: 16,
  },
  profileContainer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
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
  },
  walletContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  amountButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amountButton: {
    width: "30%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
  },
  securityInfo: {
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  securityText: {
    fontSize: 14,
    marginBottom: 8,
  },
  link: {
    fontWeight: "bold",
  },
  depositButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  depositButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
