import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // hoặc use react-native-vector-icons

const ChapterTab = () => {
  const [sortAsc, setSortAsc] = useState(true);

  const chapterList = [
    'Chương 1: Nỗi buồn thì dễ có',
    'Chương 2: Tự chữa lành',
    'Chương 3: Gieo lại hy vọng',
    'Chương 4: Bình yên từ bên trong',
    'Chương 5: Hành trình mới',
    'Chương 6: Tìm lại chính mình',
    'Chương 6: Tìm lại chính mình',
    'Chương 6: Tìm lại chính mình',
  ];

  const sortedList = sortAsc ? chapterList : [...chapterList].reverse();

  const toggleSort = () => {
    setSortAsc((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Header sắp xếp */}
      <TouchableOpacity style={styles.sortHeader} onPress={toggleSort}>
        <Ionicons name="reorder-three-outline" size={20} />
        <Text style={styles.sortText}>Sắp xếp ({sortAsc ? 'Tăng dần' : 'Giảm dần'})</Text>
      </TouchableOpacity>

      {/* Danh sách chương */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sortedList.map((item, index) => (
          <View key={index} style={styles.chapterItem}>
            <Text style={styles.chapterText}>{item}</Text>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChapterTab;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fffef5', // gần giống màu ảnh bạn gửi
    flex: 1,
  },
  sortHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  sortText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  chapterItem: {
    paddingVertical: 10,
  },
  chapterText: {
    fontSize: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 6,
  },
});
