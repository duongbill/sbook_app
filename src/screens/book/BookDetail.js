import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import IntroTab from '../../components/IntroTab';
import ChapterTab from '../../components/ChapterTab';
import ReviewTab from '../../components/ReviewTab';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

const reviews = [
  { id: '1', name: 'Nguyen Hai Duong', rating: 5, review: 'Tôi rất thích cuốn sách này. Là một cuốn sách truyền cảm hứng về hành trình tự khám phá, chữa lành và phát triển bản thân.', image: require('../../../assets/db.png') },
  { id: '2', name: 'Nguyen Hai Duong', rating: 3, review: 'Sách ổn nhưng có thể cải thiện', image: require('../../../assets/db.png') },
  { id: '3', name: 'Nguyen Hai Duong', rating: 4, review: 'Cũng khá tốt', image: require('../../../assets/db.png') },
  { id: '4', name: 'Nguyen Hai Duong', rating: 2, review: 'Không thật sự thích', image: require('../../../assets/db.png') },
  { id: '5', name: 'Nguyen Hai Duong', rating: 5, review: 'Tuyệt vời, đọc rất thích', image: require('../../../assets/db.png') },
];

const BookDetailScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('intro');
  const categories = ['Tình cảm', 'Chữa lành', 'Tâm lý'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'intro':
        return <IntroTab />;
      case 'chapter':
        return <ChapterTab />;
      case 'review':
        return <ReviewTab reviews={reviews} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={30} style={[styles.backIcon, { color: theme.colors.text }]} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <Icon name="bookmark-outline" size={24} style={[styles.saveIcon, { color: theme.colors.text }]} />
          <Icon name="ellipsis-vertical-outline" size={24} style={[styles.ellipsisIcon, { color: theme.colors.text }]} />
        </View>
      </View>

      {/* Book Info */}
      <View style={styles.bookInfo}>
        <Image
          source={require('../../../assets/adaptive-icon.png')}
          style={styles.bookImage}
        />
        <View style={styles.bookTitleInfo}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{'Come home to yourself'}</Text>
          <Text style={[styles.author, { color: theme.colors.textSecondary }]}>{'by Déjà Rae'}</Text>
          <Text style={[styles.price, { color: theme.colors.red}]}>{'Giá: 120.000 VNĐ'}</Text>
          <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>{'4.6 (508 lượt đánh giá)'}</Text>
          
          <View style={styles.categoryContainer}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryItem, { backgroundColor: theme.colors.white, borderColor: theme.colors.text }]}
                onPress={() => console.log(`Bạn chọn: ${item}`)}
              >
                <Text style={[styles.categoryText, { color: theme.colors.textSecondary }]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: theme.colors.orange }]}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'intro' && [styles.activeTab, { backgroundColor: theme.colors.white }]]}
          onPress={() => setActiveTab('intro')}
        >
          <Text style={[styles.tabText, activeTab === 'intro' && { color: theme.colors.text }]}>{'Giới thiệu'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'chapter' && [styles.activeTab, { backgroundColor: theme.colors.white }]]}
          onPress={() => setActiveTab('chapter')}
        >
          <Text style={[styles.tabText, activeTab === 'chapter' && { color: theme.colors.text }]}>{'Chương'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'review' && [styles.activeTab, { backgroundColor: theme.colors.white }]]}
          onPress={() => setActiveTab('review')}
        >
          <Text style={[styles.tabText, activeTab === 'review' && { color: theme.colors.text }]}>{'Đánh giá'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={[styles.contentContainer, { backgroundColor: theme.colors.surface }]}>
        {renderTabContent()}
      </View>

      {/* Fixed Bottom Buttons */}
      <View style={[styles.fixedBottom, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity style={[styles.shareButton, { backgroundColor: theme.colors.buttonSecondary }]}>
          <Icon name="share-social-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.previewButton, { backgroundColor: theme.colors.white }]}>
          <Icon name="book-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>{'Đọc thử'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.previewButton, { backgroundColor: theme.colors.primary }]}>
          <Icon name="cash-outline" size={20} color={theme.colors.white} />
          <Text style={[styles.buttonText, { color: theme.colors.white }]}>{'Mua ngay'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backIcon: {
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  saveIcon: {
    marginRight: 16,
  },
  bookInfo: {
    display: 'flex',
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginTop: 40,
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
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
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
    width: 'auto',
    marginTop: 8,
    fontWeight: '700',
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  categoryItem: {
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    height: 65,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  contentContainer: {
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    minHeight: 330,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: width,
    padding: 10,
    marginBottom: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shareButton: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: 125,
    height: 50,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
