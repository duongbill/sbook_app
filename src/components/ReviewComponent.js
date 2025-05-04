import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReviewComponent = ({ reviews }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null); // Tiêu chí sắp xếp (1-5 sao)

  const sortedReviews = sortCriteria
    ? [...reviews].filter((review) => review.rating === sortCriteria)
    : reviews;

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewerName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name={index < item.rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Hiển thị đánh giá đầu tiên */}
      <View style={styles.reviewCard}>
        <Text style={styles.reviewerName}>{reviews[0].name}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              name={index < reviews[0].rating ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.reviewText}>{reviews[0].comment}</Text>
      </View>

      {/* Nút xem thêm */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.writeButton}
          onPress={() => console.log('Viết đánh giá')}
        >
          <Text style={styles.buttonText}>Viết đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Xem thêm đánh giá</Text>
        </TouchableOpacity>
      </View>

      {/* Modal hiển thị danh sách đánh giá */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Danh sách đánh giá</Text>

          {/* Bộ lọc sắp xếp */}
          <View style={styles.sortContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sortButton,
                  sortCriteria === index + 1 && styles.activeSortButton,
                ]}
                onPress={() =>
                  setSortCriteria(sortCriteria === index + 1 ? null : index + 1)
                }
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortCriteria === index + 1 && styles.activeSortButtonText,
                  ]}
                >
                  {index + 1} Sao
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
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ReviewComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF2BC',
    borderRadius: 8,
  },
  reviewCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writeButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewMoreButton: {
    backgroundColor: '#3A59D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  sortButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E4E0E1',
  },
  activeSortButton: {
    backgroundColor: '#FFD700',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#555',
  },
  activeSortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 16,
  },
  reviewItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});