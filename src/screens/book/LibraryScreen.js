import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const booksData = [
  {
    id: '1',
    title: 'Come home to yourself',
    author: 'By Dujie Ran',
    rating: 4.4,
    progress: 50,
    image: 'https://www.example.com/book1.jpg', // Replace with actual image URL
  },
  {
    id: '2',
    title: 'Come home to yourself',
    author: 'By Dujie Ran',
    rating: 4.4,
    progress: 30,
    image: 'https://www.example.com/book2.jpg', // Replace with actual image URL
  },
  {
    id: '3',
    title: 'Come home to yourself',
    author: 'By Dujie Ran',
    rating: 4.4,
    progress: 70,
    image: 'https://www.example.com/book3.jpg', // Replace with actual image URL
  },
  {
    id: '4',
    title: 'Come home to yourself',
    author: 'By Dujie Ran',
    rating: 4.4,
    progress: 90,
    image: 'https://www.example.com/book4.jpg', // Replace with actual image URL
  },
  // Add more books as needed
];

const LibraryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookRating}>{item.rating} ⭐</Text>
        <Text style={styles.bookProgressLabel}>Progress: {item.progress}%</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text style={styles.tab}>Sách đang đọc</Text>
        <Text style={styles.tab}>Sách đã lưu</Text>
        <Text style={styles.tab}>Sách đã mua</Text>
      </View>

      {/* Book List */}
      <FlatList
        data={booksData.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
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
  searchBar: {
    marginBottom: 20,
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    color: '#333',
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  bookRating: {
    fontSize: 14,
    color: '#FFD700',
    marginVertical: 5,
  },
  bookProgressLabel: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#FFD700',
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
