import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Kiểm tra mật khẩu
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp");
      return;
    }

    // Xử lý đổi mật khẩu ở đây
    Alert.alert("Thành công", "Đổi mật khẩu thành công", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />
      {/* Header với nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Đổi mật khẩu
        </Text>
        <View style={styles.placeholder}></View>
      </View>

      {/* Form đổi mật khẩu */}
      <View style={styles.formContainer}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Mật khẩu cũ
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.colors.surface, color: theme.colors.text },
          ]}
          placeholder="Nhập mật khẩu cũ"
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Mật khẩu mới
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.colors.surface, color: theme.colors.text },
          ]}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Nhập lại mật khẩu mới
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.colors.surface, color: theme.colors.text },
          ]}
          placeholder="Nhập lại mật khẩu mới"
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleChangePassword}
        >
          <Text style={styles.confirmText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 0,
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
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  confirmButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
