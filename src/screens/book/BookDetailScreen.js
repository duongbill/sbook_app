import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import IntroTab from "../../components/IntroTab";
import ChapterTab from "../../components/ChapterTab";
import ReviewTab from "../../components/ReviewTab";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

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
  const [activeTab, setActiveTab] = useState("intro");
  const categories = ["Tình cảm", "Chữa lành", "Tâm lý"];
  const route = useRoute();
  const { bookId } = route.params;

  console.log("Book ID:", bookId);

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <IntroTab />;
      case "chapter":
        return <ChapterTab />;
      case "review":
        return <ReviewTab reviews={reviews} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bookmark-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="ellipsis-vertical" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Book Info */}
      <View style={styles.bookInfoContainer}>
        <View style={styles.bookInfo}>
          <Image
            source={require("../../../assets/adaptive-icon.png")}
            style={styles.bookImage}
            resizeMode="cover"
          />
          <View style={styles.bookTitleInfo}>
            <Text style={styles.title}>Come home to yourself</Text>
            <Text style={styles.author}>by Déjà Rae</Text>
            <Text style={styles.rating}>
              4.6 <Text style={styles.ratingCount}>(508 lượt đánh giá)</Text>
            </Text>

            <View style={styles.categoryContainer}>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => console.log(`Bạn chọn: ${item}`)}
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "intro" && styles.activeTab]}
          onPress={() => setActiveTab("intro")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "intro" && styles.activeTabText,
            ]}
          >
            Giới thiệu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "chapter" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("chapter")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "chapter" && styles.activeTabText,
            ]}
          >
            Chương
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "review" && styles.activeTab]}
          onPress={() => setActiveTab("review")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "review" && styles.activeTabText,
            ]}
          >
            Đánh giá
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>{renderTabContent()}</View>

      {/* Fixed Bottom Buttons */}
      <View style={styles.fixedBottom}>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-social-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.readButton}>
          <Icon name="book-outline" size={20} color="#333" />
          <Text style={styles.readButtonText}>Đọc thử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Icon name="cart-outline" size={20} color="#FFF" />
          <Text style={styles.buyButtonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  saveIcon: {
    marginRight: 8,
  },
  bookInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  bookInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bookImage: {
    width: 150,
    height: 220,
    borderRadius: 8,
    marginRight: 16,
  },
  bookTitleInfo: {
    flex: 1,
    paddingTop: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 28,
  },
  author: {
    fontSize: 16,
    marginBottom: 8,
    color: "#666",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#666",
  },
  ratingCount: {
    fontWeight: "normal",
    fontSize: 13,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFCC00",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 24,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: "#FFF9E6",
    padding: 16,
    marginHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 200,
  },
  fixedBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginTop: 20,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  readButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 1,
    marginHorizontal: 10,
  },
  readButtonText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#333",
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CC0000",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
  },
  buyButtonText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#FFF",
  },
});
