import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TransactionHistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Lịch sử giao dịch</Text>
      </View>

      <ScrollView>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Số tiền đã tiêu: 200.000đ</Text>
          <Text style={styles.linkText}>Số sách đã mua: 3</Text>
        </View>

        {/* Tháng 4 */}
        <View style={styles.monthSection}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>Tháng 4/2025</Text>
          </View>

          {[
            { title: 'Nạp tiền vào ví từ CODE', date: '13:24 - 17/04/2025', amount: '+100.000đ', type: 'income' },
            { title: 'Mua sách Come home to yourself', date: '13:24 - 17/04/2025', amount: '-58.000đ', type: 'expense' },
            { title: 'Nạp tiền vào ví từ CODE', date: '13:24 - 17/04/2025', amount: '+100.000đ', type: 'income' },
            { title: 'Mua sách Come home to yourself', date: '13:24 - 17/04/2025', amount: '-58.000đ', type: 'expense' },
          ].map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
              <Text
                style={[
                  styles.amountText,
                  item.type === 'income' ? styles.income : styles.expense,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Tháng 3 */}
        <View style={styles.monthSection}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>Tháng 3/2025</Text>
          </View>

          {[
            { title: 'Mua sách Come home to yourself', date: '13:24 - 17/03/2025', amount: '-58.000đ', type: 'expense' },
            { title: 'Nạp tiền vào ví từ CODE', date: '13:24 - 17/03/2025', amount: '+100.000đ', type: 'income' },
          ].map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
              <Text
                style={[
                  styles.amountText,
                  item.type === 'income' ? styles.income : styles.expense,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -24, // Cân chỉnh vì có nút back
  },
  summary: {
    backgroundColor: '#fff3cd',
    padding: 16,
    margin: 10,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
  },
  linkText: {
    color: 'blue',
    marginTop: 5,
  },
  monthSection: {
    marginBottom: 16,
  },
  monthHeader: {
    backgroundColor: '#cce5ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  monthText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionItem: {
    backgroundColor: '#fffbea',
    padding: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    height: 70,
    position: 'relative',
    justifyContent: 'center',
  },
  transactionTitle: {
    fontWeight: '500',
    fontSize: 15,
  },
  transactionDate: {
    fontSize: 12,
    color: 'gray',
  },
  amountText: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
});

export default TransactionHistoryScreen;
