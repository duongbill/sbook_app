import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { register } from "../../api/auth";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      const res = await register(username, password, fullName, phoneNumber);
      if (res.success) {
        Alert.alert("Thành công", "Đăng ký thành công, vui lòng đăng nhập!");
        navigation.replace("Login");
      } else {
        Alert.alert("Lỗi", "Đăng ký thất bại");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Đăng ký thất bại");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <Image
          source={require("../../../assets/regi.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng ký</Text>

        <Text style={styles.inputLabel}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          onChangeText={setFullName}
          value={fullName}
        />

        <Text style={styles.inputLabel}>Tên đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          autoCapitalize="none"
          onChangeText={setUsername}
          value={username}
        />

        <Text style={styles.inputLabel}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />

        <Text style={styles.inputLabel}>Mật khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>Nhập lại mật khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={!showConfirmPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity
            onPress={toggleShowConfirmPassword}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 220,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: "#000",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#000",
  },
});
