import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

// Dữ liệu mẫu cho sách của tác giả
const authorBooks = [
  {
    id: "1",
    title: "Come home to yourself",
    author: "DeJa Rae",
    rating: 4.6,
    description:
      "Là một cuốn sách truyền cảm hứng và hành trình tự khám phá, chứa đựng và phản ánh bản thân. Cuốn sách hướng dẫn người đọc về sự chấp nhận, tình yêu và chính mình, tổng hợp tất cả sự kết nối với nội tâm.",
    coverImage: require("../../../assets/db.png"),
  },
  {
    id: "2",
    title: "Come home to yourself",
    author: "DeJa Rae",
    rating: 4.6,
    description:
      "Là một cuốn sách truyền cảm hứng và hành trình tự khám phá, chứa đựng và phản ánh bản thân. Cuốn sách hướng dẫn người đọc về sự chấp nhận, tình yêu và chính mình, tổng hợp tất cả sự kết nối với nội tâm.",
    coverImage: require("../../../assets/db.png"),
  },
  {
    id: "3",
    title: "Come home to yourself",
    author: "DeJa Rae",
    rating: 4.6,
    description:
      "Là một cuốn sách truyền cảm hứng và hành trình tự khám phá, chứa đựng và phản ánh bản thân. Cuốn sách hướng dẫn người đọc về sự chấp nhận, tình yêu và chính mình, tổng hợp tất cả sự kết nối với nội tâm.",
    coverImage: require("../../../assets/db.png"),
  },
];

export default function InfoAuthorScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  // Render mỗi cuốn sách
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <View style={styles.bookContent}>
        <Image source={item.coverImage} style={styles.bookCover} />
        <View style={styles.bookInfo}>
          <Text style={[styles.bookTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          <Text
            style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}
          >
            by {item.author}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text
              style={[styles.ratingText, { color: theme.colors.textSecondary }]}
            >
              {item.rating}
            </Text>
          </View>
          <Text
            style={[styles.bookDescription, { color: theme.colors.text }]}
            numberOfLines={3}
          >
            {item.description}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <Ionicons name="bookmark-outline" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );

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
          Thông tin tác giả
        </Text>
        <View style={styles.placeholder}></View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Thông tin tác giả */}
        <View style={styles.authorInfoContainer}>
          <Image
            source={require("../../../assets/db.png")}
            style={styles.authorImage}
          />
          <View style={styles.authorDetails}>
            <Text style={[styles.authorName, { color: theme.colors.text }]}>
              Duong Bill
            </Text>
            <Text
              style={[styles.bookCount, { color: theme.colors.textSecondary }]}
            >
              21 cuốn sách
            </Text>
          </View>
        </View>

        {/* Tiểu sử tác giả */}
        <View style={styles.biographyContainer}>
          <Text style={[styles.biographyText, { color: theme.colors.text }]}>
            Duong Bill (sinh ngày 5 tháng 8, 2004) tên đầy đủ là Nguyễn Hải
            Dương, 21 tuổi. Là sinh viên năm ba chuyên ngành Công nghệ Thông
            tin. Tôi là sinh viên năm ba chuyên ngành Công nghệ Thông tin.
          </Text>
        </View>

        {/* Danh sách sách của tác giả */}
        <View style={styles.booksContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Các cuốn sách của tác giả
          </Text>
          <FlatList
            data={authorBooks}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
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
  scrollView: {
    flex: 1,
  },
  authorInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  authorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  authorDetails: {
    marginLeft: 16,
  },
  authorName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookCount: {
    fontSize: 14,
  },
  biographyContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  biographyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  booksContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bookItem: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  bookContent: {
    flexDirection: "row",
    flex: 1,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  bookInfo: {
    marginLeft: 12,
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  bookDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  bookmarkButton: {
    padding: 8,
  },
});
