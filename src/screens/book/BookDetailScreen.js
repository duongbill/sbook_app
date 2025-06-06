import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import IntroTab from "../../components/IntroTab";
import ChapterTab from "../../components/ChapterTab";
import ReviewTab from "../../components/ReviewTab";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { getBookById } from "../../api/api";

const { width } = Dimensions.get("window");

const reviews = [
  {
    id: "1",
    name: "Nguyen Hai Duong",
    rating: 5,
    review:
      "Tôi rất thích cuốn sách này. Là một cuốn sách truyền cảm hứng về hành trình tự khám phá, chữa lành và phát triển bản thân.",
    image: require("../../../assets/db.png"),
  },
  {
    id: "2",
    name: "Nguyen Hai Duong",
    rating: 3,
    review: "Sách ổn nhưng có thể cải thiện",
    image: require("../../../assets/db.png"),
  },
  {
    id: "3",
    name: "Nguyen Hai Duong",
    rating: 4,
    review: "Cũng khá tốt",
    image: require("../../../assets/db.png"),
  },
  {
    id: "4",
    name: "Nguyen Hai Duong",
    rating: 2,
    review: "Không thật sự thích",
    image: require("../../../assets/db.png"),
  },
  {
    id: "5",
    name: "Nguyen Hai Duong",
    rating: 5,
    review: "Tuyệt vời, đọc rất thích",
    image: require("../../../assets/db.png"),
  },
];

const BookDetailScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("intro");
  const categories = ["Tình cảm", "Chữa lành", "Tâm lý"];
  const route = useRoute();
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await getBookById(bookId);
        console.log("Book data fetched:", bookData);
        console.log("Book description:", bookData.description);
        setBook(bookData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <IntroTab description={book?.description} />;
      case "chapter":
        return <ChapterTab />;
      case "review":
        return <ReviewTab reviews={reviews} />;
      default:
        return null;
    }
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={30}
            style={[styles.backIcon, { color: theme.colors.text }]}
          />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <Icon
            name="bookmark-outline"
            size={24}
            style={[styles.saveIcon, { color: theme.colors.text }]}
          />
          <Icon
            name="ellipsis-vertical-outline"
            size={24}
            style={[styles.ellipsisIcon, { color: theme.colors.text }]}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Đang tải thông tin sách...
          </Text>
        </View>
      ) : (
        <>
          {/* Book Info */}
          <View style={styles.bookInfo}>
            <Image
              source={
                book?.image
                  ? { uri: book.image }
                  : require("../../../assets/db.png")
              }
              style={styles.bookImage}
            />
            <View style={styles.bookTitleInfo}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {book?.title}
              </Text>
              <Text
                style={[styles.author, { color: theme.colors.textSecondary }]}
              >
                by {book?.author}
              </Text>
              <Text style={[styles.price, { color: theme.colors.text_price }]}>
                {"Giá: " + (book?.price || "120.000 VNĐ")}
              </Text>
              <Text
                style={[styles.rating, { color: theme.colors.textSecondary }]}
              >
                {book?.rating} (
                {book?.rating ? Math.floor(book.rating * 100) : 0} lượt đánh
                giá)
              </Text>

              <View style={styles.categoryContainer}>
                {categories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryItem,
                      {
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background_cate,
                        borderColor: theme.colors.border,
                      },
                    ]}
                    onPress={() => console.log(`Bạn chọn: ${item}`)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        {color: theme.colors.text},
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </>
      )}

      {!loading && (
        <>
          {/* Tabs */}
          <View
            style={[
              styles.tabContainer,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "intro" && [
                  styles.activeTab,
                  { backgroundColor: theme.colors.surface },
                ],
              ]}
              onPress={() => setActiveTab("intro")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "intro" && { color: theme.colors.text },
                ]}
              >
                {"Giới thiệu"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "chapter" && [
                  styles.activeTab,
                  { backgroundColor: theme.colors.surface },
                ],
              ]}
              onPress={() => setActiveTab("chapter")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "chapter" && { color: theme.colors.text },
                ]}
              >
                {"Chương"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "review" && [
                  styles.activeTab,
                  { backgroundColor: theme.colors.surface },
                ],
              ]}
              onPress={() => setActiveTab("review")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "review" && { color: theme.colors.text },
                ]}
              >
                {"Đánh giá"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View
            style={[
              styles.contentContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            {renderTabContent()}
          </View>

          {/* Fixed Bottom Buttons */}
          <View
            style={[
              styles.fixedBottom,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.shareButton,
                { backgroundColor: theme.colors.buttonSecondary },
              ]}
            >
              <Icon
                name="share-social-outline"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.previewButton,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Icon name="book-outline" size={20} color={theme.colors.text} />
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                {"Đọc thử"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.previewButton,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Icon name="cash-outline" size={20} color={theme.colors.white} />
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                {"Mua ngay"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backIcon: {
    // color được đặt bằng theme.colors.text trong component
  },
  headerIcons: {
    flexDirection: "row",
  },
  saveIcon: {
    marginRight: 16,
  },
  bookInfo: {
    display: "flex",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginTop: 30,
    gap: 12,
  },
  bookImage: {
    width: 170,
    height: 240,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitleInfo: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  author: {
    fontSize: 16,
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    marginTop: 8,
  },
  price: {
    width: "auto",
    marginTop: 8,
    fontWeight: "700",
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  categoryItem: {
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    height: 65,
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  activeTab: {
    // backgroundColor được đặt bằng theme.colors.white trong component
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white", // Màu mặc định cho tab không active
  },
  contentContainer: {
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    minHeight: 350, // Tăng chiều cao tối thiểu từ 330 lên 350 để đảm bảo nội dung không bị che khuất
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 30, // Thêm marginBottom để tạo khoảng cách với các nút ở dưới
  },
  fixedBottom: {
    position: "absolute",
    bottom: 20, // Tăng giá trị bottom từ 0 lên 20 để các nút hiển thị cao hơn
    flexDirection: "row",
    width: width,
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  shareButton: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  previewButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: 125,
    height: 50,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
