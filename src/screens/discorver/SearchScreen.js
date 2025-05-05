import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookListItem from "../../components/BookListItem";
import AuthorCard from "../../components/AuthorCard";
import { fetchPopularBooks, fetchPopularAuthors } from "../../api/api";

const SearchScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  // useFocusEffect(
  //     useCallback(() => {
  //         const parent = navigation.getParent().getParent();
  //         parent?.setOptions({ tabBarStyle: { display: 'none' } });

  //         return () => {
  //             parent?.setOptions({
  //                 tabBarStyle: {
  //                     backgroundColor: '#E1DBCA',
  //                     borderRadius: 20,
  //                     position: 'absolute',
  //                     bottom: 15,
  //                     marginHorizontal: 10,
  //                     padding: 10,
  //                     paddingTop: 5,
  //                     height: 65,
  //                     fontCorlor: 'black',
  //                 }
  //             });
  //         };
  //     }, [navigation])
  // );

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const loadInitialData = async () => {
      const fetchedBooks = await fetchPopularBooks("");
      const fetchedAuthors = await fetchPopularAuthors();
      setBooks(fetchedBooks);
      setAuthors(fetchedAuthors);
    };

    loadInitialData();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    const results = await fetchPopularBooks(text);
    setBooks(results);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header cố định */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sách..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Filter", {
              onApply: (filters) => {
                console.log("Filters từ FilterScreen:", filters);
                // Thực hiện lọc dữ liệu ở đây
              },
            })
          }
        >
          <Ionicons
            name="options-outline"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Nội dung trượt xuống */}
      <Animated.ScrollView
        style={[
          styles.scrollContent,
          { transform: [{ translateY: slideAnim }] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Kết quả tìm kiếm
        </Text>
        {books.length === 0 ? (
          <Text style={[styles.noResultText, { color: theme.colors.text }]}>
            Không tìm thấy sách đang tìm kiếm.
          </Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookListItem
                image={item.image}
                title={item.title}
                author={item.author}
                rating={item.rating}
                description={item.description}
              />
            )}
            scrollEnabled={false}
          />
        )}

        {searchQuery.trim() === "" && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Tác giả được tìm nhiều
            </Text>
            <FlatList
              data={authors}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <AuthorCard img={item.img} name={item.name} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  scrollContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  noResultText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
    fontStyle: "italic",
  },
});

export default SearchScreen;
