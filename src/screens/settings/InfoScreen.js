import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

export default function InfoScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [fullName, setFullName] = useState("Nguyen Hai Duong");
  const [username, setUsername] = useState("duongbill");
  const [phoneNumber, setPhoneNumber] = useState("0123456789");
  const [avatar, setAvatar] = useState(null);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Thông tin cá nhân
        </Text>
      </View>

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Họ và tên
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.surface, color: theme.colors.text },
        ]}
        placeholder="Nhập họ và tên"
        placeholderTextColor={theme.colors.textSecondary}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Tên đăng nhập
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.surface, color: theme.colors.text },
        ]}
        placeholder="Nhập tên đăng nhập"
        placeholderTextColor={theme.colors.textSecondary}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Số điện thoại
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.surface, color: theme.colors.text },
        ]}
        placeholder="Nhập số điện thoại"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Đổi ảnh đại diện
      </Text>
      <TouchableOpacity
        style={[styles.avatarBox, { backgroundColor: theme.colors.surface }]}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Ionicons name="add" size={40} color={theme.colors.textSecondary} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => {
          // Xử lý lưu thông tin
          navigation.goBack();
        }}
      >
        <Text style={styles.confirmText}>Xác nhận</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 0, // Đã sử dụng SafeAreaView nên không cần marginTop
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Thay đổi từ space-between thành center để căn giữa
    marginBottom: 20,
    position: "relative", // Thêm position relative để có thể định vị tuyệt đối nút quay lại
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  avatarBox: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  confirmButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
