import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext";

const ReviewTab = ({ reviews }) => {
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false); // Modal xem đánh giá
  const [writeReviewVisible, setWriteReviewVisible] = useState(false); // Modal viết đánh giá
  const [rating, setRating] = useState(0); // Số sao
  const [title, setTitle] = useState(""); // Tiêu đề
  const [review, setReview] = useState(""); // Nội dung đánh giá
  const [sortCriteria, setSortCriteria] = useState(null); // Tiêu chí sắp xếp (null = tất cả)

  const sortedReviews = sortCriteria
    ? [...reviews]
        .filter((review) => review.rating === sortCriteria) // Lọc theo số sao
        .sort((a, b) => b.rating - a.rating) // Sắp xếp từ 5 -> 1 sao
    : [...reviews].sort((a, b) => b.rating - a.rating); // Hiển thị tất cả, sắp xếp từ 5 -> 1 sao

  const handleSubmitReview = () => {
    console.log("Đánh giá của bạn:", { rating, title, review });
    // Reset form
    setRating(0);
    setTitle("");
    setReview("");
    setWriteReviewVisible(false);
  };

  const renderReviewItem = ({ item }) => (
    <View
      style={[
        styles.reviewCard,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <View style={styles.reviewerInfo}>
        <Image
          source={item.image}
          style={[styles.reviewerImage, { borderColor: theme.colors.border }]}
        />
        <View style={styles.reviewerDetails}>
          <Text style={[styles.reviewerName, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                name={index < item.rating ? "star" : "star-outline"}
                size={16}
                color={theme.colors.orange}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={[styles.reviewText, { color: theme.colors.textSecondary }]}>
        {item.review}
      </Text>
    </View>
  );

  return (
    <View>
      {/* Hiển thị đánh giá đầu tiên */}
      <View
        style={[
          styles.reviewCard,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <View style={styles.reviewerInfo}>
          <Image
            source={reviews[0].image}
            style={[styles.reviewerImage, { borderColor: theme.colors.border }]}
          />
          <View style={styles.reviewerDetails}>
            <Text style={[styles.reviewerName, { color: theme.colors.text }]}>
              {reviews[0].name}
            </Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={index}
                  name={index < reviews[0].rating ? "star" : "star-outline"}
                  size={16}
                  color={theme.colors.orange}
                />
              ))}
            </View>
          </View>
        </View>
        <Text
          style={[styles.reviewText, { color: theme.colors.textSecondary }]}
        >
          {reviews[0].review}
        </Text>
      </View>

      {/* Nút xem thêm và viết đánh giá */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.writeButton, { backgroundColor: theme.colors.orange }]}
          onPress={() => setWriteReviewVisible(true)}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>
            Viết đánh giá
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewMoreButton,
            { backgroundColor: theme.colors.buttonBlue },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>
            Xem thêm đánh giá
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal xem đánh giá */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
            Danh sách đánh giá
          </Text>

          {/* Bộ lọc sắp xếp */}
          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortCriteria === null && {
                  backgroundColor: theme.colors.orange,
                },
              ]}
              onPress={() => setSortCriteria(null)} // Hiển thị tất cả
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortCriteria === null && { color: theme.colors.white },
                ]}
              >
                Tất cả
              </Text>
            </TouchableOpacity>
            {Array.from({ length: 5 })
              .map((_, index) => 5 - index) // Đảo ngược thứ tự từ 5 -> 1
              .map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.sortButton,
                    sortCriteria === rating && {
                      backgroundColor: theme.colors.orange,
                    },
                  ]}
                  onPress={() => setSortCriteria(rating)} // Lọc theo số sao
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      sortCriteria === rating && { color: theme.colors.white },
                    ]}
                  >
                    {rating} Sao
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          {/* Danh sách đánh giá */}
          <FlatList
            data={sortedReviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderReviewItem}
            contentContainerStyle={styles.flatListContent}
          />

          {/* Nút đóng modal */}
          <TouchableOpacity
            style={[
              styles.closeButton,
              {
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => setModalVisible(false)}
          >
            <Text
              style={[styles.closeButtonText, { color: theme.colors.text }]}
            >
              Đóng
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal viết đánh giá */}
      <Modal visible={writeReviewVisible} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
            Viết đánh giá
          </Text>

          {/* Chọn số sao */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Đánh giá của bạn:
          </Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
              >
                <Icon
                  name={index < rating ? "star" : "star-outline"}
                  size={32} // Tăng kích thước sao
                  color={theme.colors.orange}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Nhập tiêu đề */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Tiêu đề:
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.colors.border, color: theme.colors.text },
            ]}
            placeholder="Nhập tiêu đề đánh giá"
            placeholderTextColor={theme.colors.textSecondary}
            value={title}
            onChangeText={setTitle}
          />

          {/* Nhập nội dung */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Nội dung đánh giá:
          </Text>
          <TextInput
            style={[
              styles.textArea,
              { borderColor: theme.colors.border, color: theme.colors.text },
            ]}
            placeholder="Nhập nội dung đánh giá của bạn"
            placeholderTextColor={theme.colors.textSecondary}
            value={review}
            onChangeText={setReview}
            multiline
          />

          {/* Các nút hành động */}
          <View style={styles.actionButtons}>
            {/* Nút đóng */}
            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setWriteReviewVisible(false)}
            >
              <Text
                style={[styles.closeButtonText, { color: theme.colors.text }]}
              >
                Hủy
              </Text>
            </TouchableOpacity>

            {/* Nút gửi */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleSubmitReview}
            >
              <Text
                style={[styles.submitButtonText, { color: theme.colors.white }]}
              >
                Gửi đánh giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReviewTab;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
  },
  reviewerDetails: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center", // Căn giữa các sao
    gap: 15, // Khoảng cách giữa các sao
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  writeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  viewMoreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    borderRadius: 15, // Thêm border radius cho modal
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Căn giữa tiêu đề
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    height: 150, // Tăng chiều cao để dễ nhập
    textAlignVertical: "top",
    marginBottom: 25,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    minWidth: 150,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: 100,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 15,
  },
  sortContainer: {
    flexDirection: "row", // Căn các nút nằm ngang
    justifyContent: "space-between", // Khoảng cách đều giữa các nút
    marginBottom: 16,
    gap: 5,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#E4E0E1", // Màu mặc định, sẽ bị ghi đè khi được chọn
    alignItems: "center",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#555", // Màu mặc định, sẽ bị ghi đè khi được chọn
  },
});
