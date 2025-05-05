import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs for input wrappers and ScrollView
  const scrollViewRef = useRef(null);
  const fullNameWrapperRef = useRef(null);
  const emailWrapperRef = useRef(null);
  const dateOfBirthWrapperRef = useRef(null);
  const passwordWrapperRef = useRef(null);
  const confirmPasswordWrapperRef = useRef(null);
  const otpWrapperRef = useRef(null);
  const otpInputRefs = useRef([]);

  const handlePreRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp");
      return;
    }

    if (!fullName || !email || !dateOfBirth || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.vawndev.site/users/pre-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "fullName": fullName,
          "email": email,
          "password": password,
          "retypePassword": confirmPassword,
          "dataOfBirth": dateOfBirth
        }),
      });

      const data = await response.json();

      if (data.code === 1000 && data.result) {
        setEncryptedData(data.result);
        setShowOtpScreen(true);
        Alert.alert("Thành công", "Mã OTP đã được gửi đến email của bạn.");
      } else {
        Alert.alert("Lỗi", data.message || "Gửi yêu cầu đăng ký thất bại");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRegister = async () => {
    if (!otp) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.vawndev.site/users/confirm-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "otp": otp,
          "encryptedData": encryptedData,
        }),
      });

      const data = await response.json();

      if (data.code === 1000) {
        Alert.alert("Thành công", "Đăng ký thành công, vui lòng đăng nhập!", [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"),
          },
        ]);
      } else {
        Alert.alert("Lỗi", data.message || "Xác thực OTP thất bại");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToForm = () => {
    setShowOtpScreen(false);
    setOtp(""); // Reset OTP input
  };

  // Handle input focus and scroll to input
  const handleInputFocus = (wrapperRef) => {
    if (wrapperRef.current && scrollViewRef.current) {
      wrapperRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        },
        () => {
          console.warn("Failed to measure layout");
        }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
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

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {showOtpScreen ? (
            <View style={styles.otpContainer}>
              <Text style={styles.otpTitle}>Nhập mã OTP</Text>
              <Text style={styles.otpSubtitle}>
                Mã OTP đã được gửi đến {email}
              </Text>
              <Text style={styles.inputLabel}>Mã OTP</Text>
              <View ref={otpWrapperRef}>
                <View style={styles.otpInputContainer}>
                  {Array(6).fill().map((_, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpInput}
                      keyboardType="numeric"
                      maxLength={1}
                      autoComplete="off"
                      onChangeText={(value) => {
                        // Tạo mảng mới từ chuỗi OTP hiện tại
                        const newOtp = otp ? otp.split('') : Array(6).fill('');
                        // Cập nhật giá trị tại vị trí index
                        newOtp[index] = value;
                        // Chuyển lại thành chuỗi và cập nhật state
                        setOtp(newOtp.join(''));

                        // Auto focus next input
                        if (value && index < 5 && otpInputRefs.current[index + 1]) {
                          otpInputRefs.current[index + 1].focus();
                        }
                      }}
                      value={otp && otp[index] ? otp[index] : ''}
                      onFocus={() => handleInputFocus(otpWrapperRef)}
                      ref={ref => { otpInputRefs.current[index] = ref }}
                    />
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={[styles.registerButton, loading && styles.disabledButton]}
                onPress={handleConfirmRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>Xác nhận OTP</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBackToForm} disabled={loading}>
                <Text style={styles.backText}>Quay lại form đăng ký</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.title}>Đăng ký</Text>

              <Text style={styles.inputLabel}>Họ và tên</Text>
              <View ref={fullNameWrapperRef}>
                <TextInput
                  style={styles.input}
                  placeholder="Họ và tên"
                  onChangeText={setFullName}
                  value={fullName}
                  onFocus={() => handleInputFocus(fullNameWrapperRef)}
                />
              </View>

              <Text style={styles.inputLabel}>Email</Text>
              <View ref={emailWrapperRef}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  onFocus={() => handleInputFocus(emailWrapperRef)}
                />
              </View>

              <Text style={styles.inputLabel}>Ngày sinh (YYYY-MM-DD)</Text>
              <View ref={dateOfBirthWrapperRef}>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  onChangeText={setDateOfBirth}
                  value={dateOfBirth}
                  onFocus={() => handleInputFocus(dateOfBirthWrapperRef)}
                />
              </View>

              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <View ref={passwordWrapperRef} style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Mật khẩu"
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  value={password}
                  onFocus={() => handleInputFocus(passwordWrapperRef)}
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
              <View ref={confirmPasswordWrapperRef} style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  onFocus={() => handleInputFocus(confirmPasswordWrapperRef)}
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
                style={[styles.registerButton, loading && styles.disabledButton]}
                onPress={handlePreRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>Đăng ký</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  otpContainer: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  otpSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
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
    width: "100%",
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
    width: "100%",
  },
  disabledButton: {
    backgroundColor: "#666",
    opacity: 0.7,
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
  backText: {
    fontSize: 16,
    color: "#000",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  otpInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    width: 45,
    height: 50,
    textAlign: 'center',
  },
});

