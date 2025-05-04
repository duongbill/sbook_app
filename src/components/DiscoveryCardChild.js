import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";

const DiscoveryCardChild = ({ route }) => {
  const { title, description, image } = route.params;
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />

      {/* Back button overlay */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: theme.colors.primary + "80" },
          ]} // 80 adds transparency
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.background}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={image || require("../../assets/bg1.png")}
          style={styles.coverImage}
        />
        <View
          style={[styles.content, { backgroundColor: theme.colors.background }]}
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {title}
          </Text>

          <View style={styles.bookImageContainer}>
            <Image
              source={image || require("../../assets/dcvimg.png")}
              style={styles.bookImage}
            />
          </View>

          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {description && description.length > 300
              ? description
              : (description || "") +
                'Sách ra mắt lần đầu năm 2022, mang dấu ấn của tác giả với cách kể chuyện nhẹ nhàng, nghệ thuật xây dựng nhân vật ấn tượng. Từ công việc văn phòng ổn định, vì muốn có bước ngoặt lớn trong cuộc sống, Kim Seong Gon đứng ra khởi nghiệp. Anh nắm bắt xu thế, mở các cửa hàng bách hóa online, tiệm cà phê cao cấp, cửa tiệm pizza rồi đến cửa hàng in 3D, bán lẻ khẩu trang trong đại dịch. Nhưng bởi đầu tư theo "ngọn" mà không nghiên cứu một cách kỹ càng, những việc này nhanh chóng thất bại. Thay vì học hỏi và rút kinh nghiệm, anh lại đâm đầu vào các ngành khác, cố để thu lại nguồn tiền đã bỏ ra. Liên tiếp thua lỗ, anh dần biến thành một người bốc đồng, cẩu thả, không còn quan tâm đến gia đình nhỏ, khiến vợ con ngày càng xa cách. Không chỉ mắc một khoản nợ lớn, anh càng thêm áp lực khi khiến mẹ già thất vọng, vợ muốn ly thân. Buổi tối mùa đông đó, khi đến ga tàu điện ngầm, anh thấy những người vô gia cư có cuộc sống không khác mình là mấy. Ở đó, trên màn hình TV, một người giàu có nói: "Đừng lầm tưởng thế giới sẽ thay đổi, tôi có thể khẳng định rằng bạn sẽ không bao giờ thay đổi được thế giới đâu. Đừng tin những lời dối trá ấy. Tôi chỉ xin nói điều này thôi: Thứ duy nhất bạn có thể thay đổi chỉ có bản thân bạn. Từ đầu đến chân, hãy hành động cho đến khi mọi thứ thay đổi". Ban đầu anh hoài nghi về sự sáo rỗng của thông điệp, nhưng khi trấn tĩnh lại, Seong Gon thử làm theo. Nhân vật khởi phát từ những điều nhỏ nhất như thay đổi tư thế để thẳng lưng hơn giống khi còn trẻ, tập cười, tập khen người khác, tập biết cảm nhận mọi thứ để thấy vẻ đẹp hiện diện quanh mình. Quá trình thay đổi của nhân vật được Sohn Won Pyung kể lại đong đầy cảm xúc. Trên chặng đường đó, anh may mắn gặp được nhiều người mang đến cho mình những bài học cuộc sống giá trị. Đó là cậu thanh niên Jin Seok từng là nhân viên cũ ở cửa hàng pizza của anh, dần thay đổi để có thể tự tin thành lập một ban nhạc riêng. Đó cũng là cô vợ Ran Hee và con gái Ah Young sẵn sàng thứ tha và chấp nhận, để gia đình họ hạnh phúc.'}
          </Text>
          <TouchableOpacity
            style={[
              styles.readButton,
              { backgroundColor: theme.colors.bottomTabColor },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.readButtonText, { color: theme.colors.text }]}>
              Đọc ngay
            </Text>
          </TouchableOpacity>

          {/* Add extra space at bottom to prevent menu overlap */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 40, // Thay đổi từ 0 thành 40 để nút hiển thị thấp hơn
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  bookImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  bookImage: {
    width: 150,
    height: 220,
    resizeMode: "contain",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  bottomSpacer: {
    height: 80, // Extra space at bottom to prevent menu overlap
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: "justify",
    marginBottom: 30,
  },
  readButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DiscoveryCardChild;
