import React, { useContext, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const booksData = [
  {
    id: '1',
    title: 'Come home to yourself',
    author: 'By Dujie Ran',
    rating: 4.4,
    progress: 50,
    image: require('../../../assets/sach.png'),
    status: 'reading', // Thêm trạng thái
  },
  {
    id: '2',
    title: 'The Power of Now',
    author: 'By Eckhart Tolle',
    rating: 4.8,
    progress: 30,
    image: require('../../../assets/sach.png'),
    status: 'saved', // Thêm trạng thái
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'By James Clear',
    rating: 4.9,
    progress: 70,
    image: require('../../../assets/sach.png'),
    status: 'purchased', // Thêm trạng thái
  },
  {
    id: '4',
    title: 'Deep Work',
    author: 'By Cal Newport',
    rating: 4.7,
    progress: 90,
    image: require('../../../assets/sach.png'),
    status: 'reading', // Thêm trạng thái
  },
];

const tabs = [
  { key: 'reading', label: 'Sách đang đọc' },
  { key: 'saved', label: 'Sách đã lưu' },
  { key: 'purchased', label: 'Sách đã mua' },
];

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useContext(ThemeContext);
  const inputRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState('reading');

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
      style={[styles.bookItem, { backgroundColor: theme.colors.surface }]}
    >
      <Image source={item.image} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, { color: theme.colors.text }]}>{item.title}</Text>
        <Text style={[styles.bookAuthor, { color: theme.colors.text }]}>{item.author}</Text>
        <Text style={[styles.bookRating, { color: theme.colors.text }]}>
          <AntDesign name="star" size={16} color="rgb(255,204,0)" /> {item.rating}
        </Text>
        <Text style={styles.bookProgressLabel}>Đã đọc được: {item.progress}%</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${item.progress}%`, backgroundColor: theme.colors.buttonOrange }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { color: theme.colors.text }]}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>Thư viện của tôi</Text>
      </View>

      {/* Search Bar */}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.background }]}>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={theme.colors.text + '66'}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Icon name="search-outline" size={18} color={theme.colors.text} />
        </View>
      </TouchableWithoutFeedback>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setSelectedTab(tab.key)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tab,
                { color: theme.colors.text },
                selectedTab === tab.key && [styles.activeTab, {color: theme.colors.buttonOrange }],
              ]}
            >
              {tab.label}
            </Text>
            {selectedTab === tab.key && <View style={[styles.underline, {backgroundColor: theme.colors.buttonOrange }]} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtered Book List */}
      <FlatList
        data={booksData.filter((book) =>
          book.status === selectedTab &&
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Không có sách nào phù hợp.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7e6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 5,
  },
  searchInput: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tabButton: {
    alignItems: 'center',
  },
  tab: {
    fontSize: 16,
    paddingBottom: 4,
  },
  activeTab: {
    fontWeight: 'bold',
  },
  underline: {
    height: 2,
    width: '100%',
    marginTop: 2,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
  },
  bookRating: {
    fontSize: 14,
    marginVertical: 5,
  },
  bookProgressLabel: {
    fontSize: 14,
  },
  progressBarBackground: {
    width: '100%',
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 50,
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default LibraryScreen;
