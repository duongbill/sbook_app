import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

export default function LanguageScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  // Danh sách các ngôn ngữ
  const languages = [
    { id: "vi", name: "Tiếng Việt" },
    { id: "en", name: "Tiếng Anh" },
    { id: "ja", name: "Tiếng Nhật" },
    { id: "new1", name: "Tiếng Trung" },
    { id: "new2", name: "Tiếng Nga" },
    { id: "new3", name: "Tiếng Pháp" },
  ];

  // State để lưu ngôn ngữ đã chọn
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Xử lý khi chọn ngôn ngữ
  const handleSelectLanguage = (langId) => {
    setSelectedLanguage(langId);
  };

  // Xử lý khi xác nhận
  const handleConfirm = () => {
    // Xử lý thay đổi ngôn ngữ ở đây
    Alert.alert("Thành công", "Đã thay đổi ngôn ngữ thành công", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

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
          Ngôn ngữ
        </Text>
        <View style={styles.placeholder}></View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Ngôn ngữ
      </Text>

      {/* Danh sách ngôn ngữ */}
      <ScrollView style={styles.languageList}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.languageItem,
              { borderBottomColor: theme.colors.border },
            ]}
            onPress={() => handleSelectLanguage(lang.id)}
          >
            <Text style={[styles.languageName, { color: theme.colors.text }]}>
              {lang.name}
            </Text>
            <View style={styles.radioButton}>
              {selectedLanguage === lang.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Nút xác nhận */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  languageList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  languageName: {
    fontSize: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  confirmButton: {
    backgroundColor: "#B71C1C",
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
