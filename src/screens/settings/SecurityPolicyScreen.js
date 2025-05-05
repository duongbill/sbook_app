import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

export default function SecurityPolicyScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header với nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Chính sách bảo mật
        </Text>
        <View style={styles.placeholder}></View>
      </View>

      {/* Nội dung chính sách bảo mật */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            1. Thông tin chúng tôi thu thập
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký tài
            khoản, sử dụng dịch vụ của chúng tôi, hoặc liên hệ với chúng tôi.
            Thông tin này có thể bao gồm tên, địa chỉ email, số điện thoại, và
            các thông tin khác mà bạn cung cấp.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            2. Cách chúng tôi sử dụng thông tin
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Chúng tôi sử dụng thông tin của bạn để cung cấp, duy trì và cải
            thiện dịch vụ của chúng tôi, để liên lạc với bạn, và để bảo vệ quyền
            lợi của chúng tôi và người dùng khác.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            3. Bảo mật thông tin
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin
            cá nhân của bạn khỏi mất mát, truy cập trái phép, sử dụng sai mục
            đích, thay đổi hoặc tiết lộ.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            4. Chia sẻ thông tin
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của
            bạn cho bên thứ ba mà không có sự đồng ý của bạn, trừ khi cần thiết
            để cung cấp dịch vụ hoặc theo yêu cầu của pháp luật.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            5. Quyền của bạn
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Bạn có quyền truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình.
            Bạn cũng có thể yêu cầu chúng tôi hạn chế xử lý thông tin của bạn
            hoặc phản đối việc xử lý đó.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            6. Thay đổi chính sách
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
            Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng
            chính sách mới trên App của chúng tôi.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            7. Liên hệ
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text }]}>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng
            liên hệ với chúng tôi qua email: sbook25@gmail.com
          </Text>
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.textSecondary }]}
          >
            Cập nhật lần cuối: 01/06/2023
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40, // Để cân bằng với nút back
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
