import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";

const TransactionHistoryScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Lịch sử giao dịch
        </Text>
      </View>

      <ScrollView>
        <View
          style={[
            styles.summary,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <Text style={[styles.summaryText, { color: theme.colors.text }]}>
            Số tiền đã tiêu: 200.000đ
          </Text>
          <Text style={[styles.linkText, { color: theme.colors.primary }]}>
            Số sách đã mua: 3
          </Text>
        </View>

        {/* Tháng 4 */}
        <View style={styles.monthSection}>
          <View
            style={[
              styles.monthHeader,
              { backgroundColor: theme.colors.cardHeaderBackground },
            ]}
          >
            <Text style={[styles.monthText, { color: theme.colors.text }]}>
              Tháng 4/2025
            </Text>
          </View>

          {[
            {
              title: "Nạp tiền vào ví từ CODE",
              date: "13:24 - 17/04/2025",
              amount: "+100.000đ",
              type: "income",
            },
            {
              title: "Mua sách Come home to yourself",
              date: "13:24 - 17/04/2025",
              amount: "-58.000đ",
              type: "expense",
            },
            {
              title: "Nạp tiền vào ví từ CODE",
              date: "13:24 - 17/04/2025",
              amount: "+100.000đ",
              type: "income",
            },
            {
              title: "Mua sách Come home to yourself",
              date: "13:24 - 17/04/2025",
              amount: "-58.000đ",
              type: "expense",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[
                styles.transactionItem,
                {
                  backgroundColor: theme.colors.cardItemBackground,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[styles.transactionTitle, { color: theme.colors.text }]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.transactionDate,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.date}
              </Text>
              <Text
                style={[
                  styles.amountText,
                  item.type === "income"
                    ? { color: theme.colors.success }
                    : { color: theme.colors.error },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Tháng 3 */}
        <View style={styles.monthSection}>
          <View
            style={[
              styles.monthHeader,
              { backgroundColor: theme.colors.cardHeaderBackground },
            ]}
          >
            <Text style={[styles.monthText, { color: theme.colors.text }]}>
              Tháng 3/2025
            </Text>
          </View>

          {[
            {
              title: "Mua sách Come home to yourself",
              date: "13:24 - 17/03/2025",
              amount: "-58.000đ",
              type: "expense",
            },
            {
              title: "Nạp tiền vào ví từ CODE",
              date: "13:24 - 17/03/2025",
              amount: "+100.000đ",
              type: "income",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[
                styles.transactionItem,
                {
                  backgroundColor: theme.colors.cardItemBackground,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[styles.transactionTitle, { color: theme.colors.text }]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.transactionDate,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.date}
              </Text>
              <Text
                style={[
                  styles.amountText,
                  item.type === "income"
                    ? { color: theme.colors.success }
                    : { color: theme.colors.error },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor được đặt bằng theme.colors.background trong component
    paddingTop: 0, // Đã sử dụng SafeAreaView nên không cần paddingTop
  },
  header: {
    flexDirection: "row",
    padding: 16,
    // backgroundColor và borderColor được đặt bằng theme trong component
    borderBottomWidth: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginLeft: -24, // Cân chỉnh vì có nút back
  },
  summary: {
    // backgroundColor được đặt bằng theme.colors.cardBackground trong component
    padding: 16,
    margin: 10,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
  },
  linkText: {
    // color được đặt bằng theme.colors.primary trong component
    marginTop: 5,
  },
  monthSection: {
    marginBottom: 16,
  },
  monthHeader: {
    // backgroundColor được đặt bằng theme.colors.cardHeaderBackground trong component
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  monthText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  transactionItem: {
    // backgroundColor và borderColor được đặt bằng theme trong component
    padding: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    height: 70,
    position: "relative",
    justifyContent: "center",
  },
  transactionTitle: {
    fontWeight: "500",
    fontSize: 15,
  },
  transactionDate: {
    fontSize: 12,
    // color được đặt bằng theme.colors.textSecondary trong component
  },
  amountText: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  income: {
    // color được đặt bằng theme.colors.success trong component
  },
  expense: {
    // color được đặt bằng theme.colors.error trong component
  },
});

export default TransactionHistoryScreen;
