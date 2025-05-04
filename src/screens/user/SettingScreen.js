import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const settings = [
  { icon: "person-outline", label: "Thông tin cá nhân" },
  { icon: "lock-closed-outline", label: "Đổi mật khẩu" },
  { icon: "wallet-outline", label: "Ví của tôi" },
  { icon: "language-outline", label: "Ngôn ngữ" },
  { icon: "moon-outline", label: "Chế độ tối" },
  { icon: "gift-outline", label: "Vòng quay may mắn" },
  { icon: "help-circle-outline", label: "Hỗ trợ từ kỹ thuật viên" },
  { icon: "bookmarks-outline", label: "Bảo mật" },
  { icon: "log-out-outline", label: "Đăng xuất" },
];

const SettingScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [supportModalVisible, setSupportModalVisible] = useState(false);

  // Số điện thoại kỹ thuật viên
  const techSupportPhone = "0985082004";

  // Hàm gọi điện thoại
  const callTechSupport = () => {
    Linking.openURL(`tel:${techSupportPhone}`);
    setSupportModalVisible(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.containerTab,
          { backgroundColor: theme.colors.bottomTabColor },
        ]}
      >
        {/* Profile section */}
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
          <View style={styles.profileText}>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              Nguyen Hai Duong
            </Text>
            <Text
              style={[styles.username, { color: theme.colors.textSecondary }]}
            >
              @duongbill
            </Text>
            <Text style={[styles.balance, { color: theme.colors.text }]}>
              Số dư : 100,000đ
            </Text>
          </View>
        </View>

        {/* Setting items */}
        {settings.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, { borderBottomColor: theme.colors.text }]}
            onPress={() => {
              if (item.label === "Đăng xuất") {
                // Handle logout logic here
                console.log("Logged out");
              } else if (item.label === "Chế độ tối") {
                navigation.navigate("Mode");
              } else if (item.label === "Thông tin cá nhân") {
                // Sử dụng CommonActions để điều hướng chính xác trong navigator lồng nhau
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "Info",
                  })
                );
                console.log("Navigating to Info screen");
              } else if (item.label === "Đổi mật khẩu") {
                // Điều hướng đến màn hình đổi mật khẩu
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "ChangePassword",
                  })
                );
                console.log("Navigating to ChangePassword screen");
              } else if (item.label === "Ngôn ngữ") {
                // Điều hướng đến màn hình ngôn ngữ
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "Language",
                  })
                );
                console.log("Navigating to Language screen");
              } else if (item.label === "Vòng quay may mắn") {
                // Điều hướng đến màn hình vòng quay may mắn
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "GachaScreen",
                  })
                );
                console.log("Navigating to GachaScreen");
              } else if (item.label === "Bảo mật") {
                // Điều hướng đến màn hình chính sách bảo mật
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "SecurityPolicy",
                  })
                );
                console.log("Navigating to SecurityPolicy screen");
              } else if (item.label === "Ví của tôi") {
                // Điều hướng đến màn hình ví của tôi
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "MyWallet",
                  })
                );
                console.log("Navigating to MyWallet screen");
              } else if (item.label === "Hỗ trợ từ kỹ thuật viên") {
                // Hiển thị modal số kỹ thuật viên
                setSupportModalVisible(true);
                console.log("Showing tech support modal");
              } else {
                navigation.navigate("Setting");
              }
            }}
          >
            <View style={styles.iconLabel}>
              <View style={[styles.icon, { borderColor: theme.colors.text }]}>
                <Icon
                  name={item.icon}
                  size={20}
                  style={[{ color: theme.colors.text }]}
                />
              </View>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                {item.label}
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal hiển thị số kỹ thuật viên */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={supportModalVisible}
        onRequestClose={() => setSupportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Hỗ trợ kỹ thuật
            </Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>
              Gọi ngay cho kỹ thuật viên để được hỗ trợ:
            </Text>
            <Text style={[styles.phoneNumber, { color: theme.colors.primary }]}>
              {techSupportPhone}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setSupportModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.callButton]}
                onPress={callTechSupport}
              >
                <Text style={styles.buttonText}>Gọi ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTab: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 60,
  },
  profileContainer: {
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  profileText: {
    marginLeft: 10,
    flex: 1,
    gap: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    color: "#666",
    fontSize: 13,
  },
  balance: {
    fontSize: 13,
    marginTop: 4,
  },
  editIcon: {
    position: "absolute",
    // top: 10,
    right: 10,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    marginLeft: 15,
    marginRight: 15,
  },
  iconLabel: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    margin: 4,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  callButton: {
    backgroundColor: "#B71C1C",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SettingScreen;
