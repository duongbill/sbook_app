import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  Easing,
  Alert,
  Image,
  ImageBackground,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Define prizes for the wheel - book-themed rewards
const prizes = [
  {
    color: "#FF5722",
    value: "hot_book",
    icon: "📚",
    description: "Miễn phí mua sách dưới 100.000đ",
  },
  {
    color: "#F44336",
    value: "new_book",
    icon: "📖",
    description: "Giảm giá 50% khi mua sách tiếp theo",
  },
  {
    color: "#2196F3",
    value: "coins",
    icon: "💰",
    description: "CODE 100.000đ",
  },
  {
    color: "#607D8B",
    value: "nothing",
    icon: "😔",
    description: "Chúc bạn may mắn lần sau",
  },
];

const GachaScreen = () => {
  const navigation = useNavigation();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [remainingSpins, setRemainingSpins] = useState(1);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const countdownTimerRef = useRef(null);
  const username = "duongbill.58";

  // Dọn dẹp bộ đếm thời gian khi component bị hủy
  React.useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, []);

  // Function to select a prize based on weighted probability
  const selectPrize = () => {
    // Define probabilities for each prize (total should be 100)
    const probabilities = [1, 1, 1, 97];

    // Generate a random number between 0 and 100
    const rand = Math.random() * 100;

    // Find the prize based on probability
    let cumulativeProbability = 0;
    for (let i = 0; i < prizes.length; i++) {
      cumulativeProbability += probabilities[i];
      if (rand <= cumulativeProbability) {
        return i;
      }
    }

    // Fallback to the last prize if something goes wrong
    return prizes.length - 1;
  };

  // Function to start spinning the wheel
  const startSpin = () => {
    if (spinning || remainingSpins <= 0) return;

    // Decrease remaining spins
    setRemainingSpins((prev) => prev - 1);

    // Reset previous result
    setResult(null);
    setSpinning(true);

    // Random number of full rotations (between 5 and 10)
    const rotations = 5 + Math.floor(Math.random() * 5);

    // Select prize based on weighted probability
    const prizeIndex = selectPrize();

    // Calculate final rotation value
    // For perfect alignment with the pointer:
    // 1. We need to make sure the wheel rotates exactly to the selected prize
    // 2. Each segment takes up 1/prizes.length of the wheel
    const segmentAngle = 1 / prizes.length;
    // Calculate the final rotation to align the selected prize with the pointer at the top
    // We need to adjust by (1 - prizeIndex * segmentAngle - segmentAngle/2) to make the prize land at top
    const finalValue =
      rotations + (1 - (prizeIndex * segmentAngle + segmentAngle / 2));

    // Start the animation with a more realistic spinning effect
    Animated.timing(spinValue, {
      toValue: finalValue,
      duration: 2500, // chỉ quay trong 2.5 giây (nhanh hơn)
      easing: Easing.bezier(0.3, 0.7, 0.6, 1), // đẩy nhanh hơn ban đầu, vẫn mượt
      useNativeDriver: true,
    }).start(() => {
      // Animation completed
      setSpinning(false);

      // Show result
      const prize = prizes[prizeIndex];
      setResult(prize);

      // Show custom alert with prize
      setTimeout(() => {
        showAlert("Kết quả", `Bạn đã quay vào\n\n${prize.description}`);
      }, 500);
    });
  };

  // Map spin value to rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const goToBookstore = () => {
    Alert.alert("Thông báo", "Chuyển đến kho sách");
  };

  // Function to show custom alert
  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowCustomAlert(true);
  };

  // Function to handle closing the ad before completion
  const handleCloseAd = () => {
    // Nếu đang đếm ngược, hủy đếm ngược
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    setIsCountingDown(false);

    // Show warning that user won't get a spin
    showAlert(
      "Cảnh báo",
      "Bạn sẽ không nhận được lượt quay nếu thoát trước khi kết thúc."
    );
    setShowAdModal(false);
  };

  // Function to start countdown timer
  const startCountdownTimer = () => {
    // Đảm bảo xóa bất kỳ timer nào đang chạy trước đó
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    // Đặt lại countdown và trạng thái
    setCountdown(10);
    setIsCountingDown(true);

    // Sử dụng setInterval cho đếm ngược ổn định hơn
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        const newCount = prevCount - 1;

        if (newCount <= 0) {
          // Khi đếm ngược kết thúc
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;

          // Đặt các trạng thái theo thứ tự phù hợp
          setIsCountingDown(false);
          setShowAdModal(false);

          // Đảm bảo việc thêm lượt quay xảy ra sau khi modal đã đóng
          setTimeout(() => {
            console.log("Thêm lượt quay sau khi đếm ngược kết thúc");
            setRemainingSpins((prev) => prev + 1);
            showAlert("Thành công", "Bạn đã nhận được 1 lượt quay miễn phí!");
          }, 300);

          return 0;
        }

        return newCount;
      });
    }, 1000);
  };

  // Function to get more spins by waiting 10 seconds
  const getMoreSpins = () => {
    // Reset trạng thái đếm ngược
    setIsCountingDown(true);

    // Xóa bất kỳ timer nào đang chạy
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    // Hiển thị modal đếm ngược
    setShowAdModal(true);

    // Đặt lại countdown và bắt đầu đếm ngược
    setCountdown(10);
    startCountdownTimer();
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{ uri: "https://example.com/placeholder.jpg" }}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor="#1E3A5F" />

        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>VÒNG QUAY MAY MẮN</Text>
        </View>

        {/* User info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <Text style={styles.userName}>{username} - Trúng 100.000đ</Text>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Wheel container with decoration */}
          <View style={styles.wheelOuterContainer}>
            {/* Decorative elements */}
            <View style={styles.decorationTop}>
              <Ionicons name="book" size={28} color="#FFD700" />
            </View>
            <View style={styles.decorationLeft}>
              <Ionicons name="star" size={28} color="#FFD700" />
            </View>
            <View style={styles.decorationRight}>
              <Ionicons name="star" size={28} color="#FFD700" />
            </View>
            <View style={styles.decorationBottom}>
              <Ionicons name="book" size={28} color="#FFD700" />
            </View>

            <View style={styles.wheelContainer}>
              {/* Outer glowing ring */}
              <View style={styles.wheelRing} />

              {/* Spinning wheel */}
              <Animated.View
                style={[styles.wheel, { transform: [{ rotate: spin }] }]}
              >
                {prizes.map((prize, index) => {
                  const angle = (index / prizes.length) * 360;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.wheelSegment,
                        {
                          transform: [{ rotate: `${angle}deg` }],
                          backgroundColor: prize.color,
                        },
                      ]}
                    >
                      <View style={styles.iconContainer}>
                        <Text style={styles.wheelSegmentIcon}>
                          {prize.icon}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </Animated.View>

              {/* Center button - clickable */}
              <TouchableOpacity
                style={[
                  styles.wheelCenter,
                  (spinning || remainingSpins <= 0) &&
                    styles.wheelCenterDisabled,
                ]}
                onPress={startSpin}
                disabled={spinning || remainingSpins <= 0}
              >
                <Text style={styles.wheelCenterText}>
                  {spinning ? "..." : "QUAY"}
                </Text>
              </TouchableOpacity>

              {/* Pointer */}
              <View style={styles.pointer}>
                <View style={styles.pointerTriangle} />
              </View>
            </View>
          </View>

          {/* Result display - shows after spinning */}
          {result && (
            <View style={styles.resultContainer}>
              <View
                style={[
                  styles.resultIconContainer,
                  { backgroundColor: result.color },
                ]}
              >
                <Text style={styles.resultIcon}>{result.icon}</Text>
              </View>
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultTitle}>Bạn đã quay vào</Text>
                <Text style={styles.resultDescription}>
                  {result.description}
                </Text>
              </View>
            </View>
          )}

          {/* Remaining spins info */}
          <View style={styles.remainingSpinsContainer}>
            <Text style={styles.remainingSpinsText}>
              Bạn còn {remainingSpins} lượt quay
            </Text>
            {remainingSpins <= 0 && (
              <TouchableOpacity
                style={styles.getMoreSpinsButton}
                onPress={getMoreSpins}
              >
                <Text style={styles.getMoreSpinsText}>Nhận thêm lượt</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Get more spins section */}
          <View style={styles.moreSpinsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nhận thêm lượt quay</Text>
            </View>

            <View style={styles.spinsInfoCard}>
              <View style={styles.spinIconContainer}>
                <Ionicons name="book" size={30} color="#1E3A5F" />
              </View>
              <View style={styles.spinTextContainer}>
                <Text style={styles.spinCardTitle}>Đọc sách nhận quà</Text>
                <Text style={styles.spinCardSubtitle}>
                  Đọc 30 phút để nhận thêm lượt quay
                </Text>
                <Text style={styles.spinReward}>Tiến độ: 10/30 phút</Text>
              </View>
              <TouchableOpacity
                style={styles.shopButton}
                onPress={goToBookstore}
              >
                <Text style={styles.shopButtonText}>Đọc ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Countdown Modal */}
      <Modal
        visible={showAdModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseAd}
      >
        <View style={styles.modalContainer}>
          <View style={styles.videoContainer}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoHeaderText}>Nhận lượt quay</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseAd}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Hiển thị đếm ngược */}
            <View style={styles.countdownOnlyContainer}>
              <Text style={styles.countdownTitle}>Nhận lượt quay miễn phí</Text>
              <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>{countdown}</Text>
              </View>
              <Text style={styles.waitingText}>
                Vui lòng đợi {countdown} giây...
              </Text>

              {/* Nút nhận ngay */}
              <TouchableOpacity
                style={styles.getSpinNowButton}
                onPress={() => {
                  // Hủy đếm ngược
                  if (countdownTimerRef.current) {
                    clearInterval(countdownTimerRef.current);
                    countdownTimerRef.current = null;
                  }

                  // Cấp lượt quay và đóng modal
                  setShowAdModal(false);

                  // Đảm bảo việc cập nhật state diễn ra sau khi modal đóng
                  setTimeout(() => {
                    setRemainingSpins((prev) => prev + 1);
                    showAlert(
                      "Thành công",
                      "Bạn đã nhận được 1 lượt quay miễn phí!"
                    );
                  }, 100);

                  setIsCountingDown(false);
                }}
              >
                <Text style={styles.getSpinNowText}>Nhận ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Alert Modal */}
      <Modal
        visible={showCustomAlert}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCustomAlert(false)}
      >
        <View style={styles.alertModalContainer}>
          <View style={styles.alertBox}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertTitle}>{alertTitle}</Text>
            </View>
            <View style={styles.alertBody}>
              <Text style={styles.alertMessage}>{alertMessage}</Text>
            </View>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setShowCustomAlert(false)}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#1E3A5F", // Darker blue for book reading theme
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#1E3A5F",
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Thay đổi từ space-between thành center để căn giữa tiêu đề
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative", // Thêm position relative để có thể định vị tuyệt đối nút back
  },
  backButton: {
    padding: 8,
    position: "absolute", // Thêm position absolute để định vị nút back
    left: 8, // Đặt nút back sát lề trái
    zIndex: 10, // Đảm bảo nút back hiển thị trên các phần tử khác
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 14,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  wheelOuterContainer: {
    width: 340,
    height: 340,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 10,
    marginBottom: 20,
  },
  decorationTop: {
    position: "absolute",
    top: -10,
    zIndex: 5,
  },
  decorationLeft: {
    position: "absolute",
    left: -10,
    top: "45%",
    zIndex: 5,
  },
  decorationRight: {
    position: "absolute",
    right: -10,
    top: "45%",
    zIndex: 5,
  },
  decorationBottom: {
    position: "absolute",
    bottom: -10,
    zIndex: 5,
  },
  wheelContainer: {
    width: 320,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  wheelRing: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 3,
    borderColor: "#FFD700",
    borderStyle: "dashed",
    // Glow effect
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  wheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 8,
    borderColor: "#1E3A5F",
    overflow: "hidden",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  wheelSegment: {
    position: "absolute",
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transformOrigin: "top left",
    borderWidth: 2,
    borderColor: "#fff",
    // Add subtle gradient effect with shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    // Position in the middle of the segment
    top: "25%",
    left: "25%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  wheelSegmentIcon: {
    fontSize: 30,
    color: "white",
    // Text shadow for visibility
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  wheelCenter: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1E3A5F",
    borderWidth: 6,
    borderColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  wheelCenterDisabled: {
    backgroundColor: "#536B8B",
    borderColor: "#D4AF37",
    opacity: 0.8,
  },
  wheelCenterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
    // Text shadow for visibility
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pointer: {
    position: "absolute",
    top: -15,
    alignItems: "center",
    zIndex: 15,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFD700",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  remainingSpinsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  remainingSpinsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 5,
  },
  getMoreSpinsButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  getMoreSpinsText: {
    color: "#1E3A5F",
    fontWeight: "bold",
    fontSize: 12,
  },
  resultContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    width: "90%",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  resultIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  resultIcon: {
    fontSize: 24,
  },
  resultTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 5,
  },
  resultDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  resultPrize: {
    fontWeight: "bold",
    color: "#FF8C00",
  },
  moreSpinsSection: {
    width: "100%",
    backgroundColor: "#2E5384", // Lighter blue for book theme
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    marginTop: 10,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    // Text shadow for visibility
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  spinsInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  spinIconContainer: {
    marginRight: 15,
  },
  spinTextContainer: {
    flex: 1,
  },
  spinCardTitle: {
    fontWeight: "bold",
    color: "#1E3A5F",
    fontSize: 15,
  },
  spinCardSubtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },
  spinReward: {
    color: "#FF8C00",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 13,
  },
  shopButton: {
    backgroundColor: "#1E3A5F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  booksSection: {
    width: "100%",
    backgroundColor: "#2E5384",
    padding: 15,
  },
  bookOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  bookOption: {
    width: "23%",
    alignItems: "center",
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  bookCoverText: {
    fontSize: 24,
  },
  bookTitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 5,
    height: 25,
  },
  // Modal and Alert styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: "90%",
    height: 300,
    backgroundColor: "#1E3A5F",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1E3A5F",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD700",
  },
  videoHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    padding: 5,
    zIndex: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  countdownOnlyContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#1E3A5F",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  countdownTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  countdownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E3A5F",
  },
  waitingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    fontStyle: "italic",
  },
  getSpinNowButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  getSpinNowText: {
    color: "#1E3A5F",
    fontWeight: "bold",
    fontSize: 16,
  },
  countdownOnlyContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#1E3A5F",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  countdownTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  countdownContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A5F",
  },
  waitingText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 15,
    fontStyle: "italic",
  },
  getSpinNowButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  getSpinNowText: {
    color: "#1E3A5F",
    fontWeight: "bold",
    fontSize: 14,
  },
  alertModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  alertHeader: {
    padding: 15,
    backgroundColor: "#1E3A5F",
    alignItems: "center",
  },
  alertTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  alertBody: {
    padding: 20,
    alignItems: "center",
  },
  alertMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
  },
  alertButton: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  alertButtonText: {
    color: "#1E3A5F",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GachaScreen;
