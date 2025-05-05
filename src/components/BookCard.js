import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const BookCard = ({ title, author, image, id }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("BookDetail", { bookId: id });
  };

  return (
    <TouchableOpacity style={styles.bookCard} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.bookImage} />
      <Text style={[styles.bookTitleSmall, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}>
        by {author}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    width: 120,
    marginRight: 12,
  },
  bookImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  bookTitleSmall: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  bookAuthor: {
    fontSize: 12,
  },
});

export default BookCard;
