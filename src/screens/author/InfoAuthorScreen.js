import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { getAuthorById } from "../../api/api";

export default function InfoAuthorScreen({ route }) {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);

  // Lấy thông tin tác giả từ tham số được truyền
  const { authorId } = route.params || {};

  // Lấy thông tin chi tiết của tác giả
  useEffect(() => {
    console.log("authorId received:", authorId);

    const fetchAuthorDetails = async () => {
      try {
        const authorData = await getAuthorById(authorId);
        console.log("Author data fetched:", authorData);
        setAuthor(authorData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tác giả:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [authorId]);

  // Render mỗi cuốn sách
  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
    >
      <View style={styles.bookContent}>
        <Image
          source={
            item.image ? { uri: item.image } : require("../../../assets/db.png")
          }
          style={styles.bookCover}
        />
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
      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
      >
        <Ionicons name="book-outline" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Đang tải thông tin tác giả...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Thông tin tác giả */}
          <View style={styles.authorInfoContainer}>
            <Image
              source={
                author?.image
                  ? { uri: author.image }
                  : require("../../../assets/db.png")
              }
              style={styles.authorImage}
            />
            <View style={styles.authorDetails}>
              <Text style={[styles.authorName, { color: theme.colors.text }]}>
                {author?.name || "Tác giả không xác định"}
              </Text>
              <Text
                style={[
                  styles.bookCount,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {author?.bookCount || 0} cuốn sách
              </Text>
            </View>
          </View>

          {/* Tiểu sử tác giả */}
          <View style={styles.biographyContainer}>
            <Text style={[styles.biographyText, { color: theme.colors.text }]}>
              {author?.biography || "Không có thông tin tiểu sử."}
            </Text>
          </View>

          {/* Danh sách sách của tác giả */}
          <View style={styles.booksContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Các cuốn sách của tác giả
            </Text>
            {author?.books && author.books.length > 0 ? (
              <FlatList
                data={author.books}
                renderItem={renderBookItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <Text
                style={[styles.noBooks, { color: theme.colors.textSecondary }]}
              >
                Không có sách nào của tác giả này.
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  noBooks: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20,
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
