import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const ReviewTab = ({ reviews }) => {
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false); // Modal xem đánh giá
  const [writeReviewVisible, setWriteReviewVisible] = useState(false); // Modal viết đánh giá
  const [rating, setRating] = useState(0); // Số sao
  const [title, setTitle] = useState(''); // Tiêu đề
  const [review, setReview] = useState(''); // Nội dung đánh giá
  const [sortCriteria, setSortCriteria] = useState(null); // Tiêu chí sắp xếp (null = tất cả)

  const sortedReviews = sortCriteria
    ? [...reviews]
        .filter((review) => review.rating === sortCriteria) // Lọc theo số sao
        .sort((a, b) => b.rating - a.rating) // Sắp xếp từ 5 -> 1 sao
    : [...reviews].sort((a, b) => b.rating - a.rating); // Hiển thị tất cả, sắp xếp từ 5 -> 1 sao

  const handleSubmitReview = () => {
    console.log('Đánh giá của bạn:', { rating, title, review });
    // Reset form
    setRating(0);
    setTitle('');
    setReview('');
    setWriteReviewVisible(false);
  };

  const renderReviewItem = ({ item }) => (
    <View style={[styles.reviewCard, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
      <View style={styles.reviewerInfo}>
        <Image source={item.image} style={[styles.reviewerImage, { borderColor: theme.colors.border }]} />
        <View style={styles.reviewerDetails}>
          <Text style={[styles.reviewerName, { color: theme.colors.text }]}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                name={index < item.rating ? 'star' : 'star-outline'}
                size={16}
                color={theme.colors.orange}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={[styles.reviewText, { color: theme.colors.textSecondary }]}>{item.review}</Text>
    </View>
  );

  return (
    <View>
      {/* Hiển thị đánh giá đầu tiên */}
      <View style={[styles.reviewCard, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <View style={styles.reviewerInfo}>
          <Image source={reviews[0].image} style={[styles.reviewerImage, { borderColor: theme.colors.border }]} />
          <View style={styles.reviewerDetails}>
            <Text style={[styles.reviewerName, { color: theme.colors.text }]}>{reviews[0].name}</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={index}
                  name={index < reviews[0].rating ? 'star' : 'star-outline'}
                  size={16}
                  color={theme.colors.orange}
                />
              ))}
            </View>
          </View>
        </View>
        <Text style={[styles.reviewText, { color: theme.colors.textSecondary }]}>{reviews[0].review}</Text>
      </View>

      {/* Nút xem thêm và viết đánh giá */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.writeButton, { backgroundColor: theme.colors.orange }]}
          onPress={() => setWriteReviewVisible(true)}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Viết đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewMoreButton, { backgroundColor: theme.colors.buttonBlue }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Xem thêm đánh giá</Text>
        </TouchableOpacity>
      </View>

      {/* Modal xem đánh giá */}
      <Modal visible={modalVisible} animationType="slide">
  <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
    <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Danh sách đánh giá</Text>

    {/* Bộ lọc sắp xếp */}
    <View style={styles.sortContainer}>
      <TouchableOpacity
        style={[
          styles.sortButton,
          sortCriteria === null && { backgroundColor: theme.colors.orange },
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
              sortCriteria === rating && { backgroundColor: theme.colors.orange },
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
            style={[styles.closeButton, { backgroundColor: theme.colors.white, borderColor: theme.colors.border }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.closeButtonText, { color: theme.colors.text}]}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal viết đánh giá */}
      <Modal visible={writeReviewVisible} animationType="slide">
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Viết đánh giá</Text>

          {/* Chọn số sao */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Đánh giá của bạn:</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                <Icon
                  name={index < rating ? 'star' : 'star-outline'}
                  size={24}
                  color={theme.colors.orange}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Nhập tiêu đề và nội dung */}
          <TextInput
            style={[styles.textArea, { borderColor: theme.colors.border, color: theme.colors.text }]}
            placeholder="Đánh giá"
            placeholderTextColor={theme.colors.textSecondary}
            value={review}
            onChangeText={setReview}
            multiline
          />

          {/* Nút gửi */}
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.colors.orange }]}
            onPress={handleSubmitReview}
          >
            <Text style={[styles.submitButtonText, { color: theme.colors.text }]}>Gửi</Text>
          </TouchableOpacity>

          {/* Nút đóng */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.colors.white, borderColor: theme.colors.border }]}
            onPress={() => setWriteReviewVisible(false)}
          >
            <Text style={[styles.closeButtonText, { color: theme.colors.text}]}>Đóng</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  writeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row', // Căn các nút nằm ngang
    justifyContent: 'space-between', // Khoảng cách đều giữa các nút
    marginBottom: 16,
    gap: 5,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E4E0E1',
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#555',
  },
});