import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const AuthorCard = ({ img, name, id }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("InfoAuthorScreen", {
      authorId: id,
      authorName: name,
      authorImage: img,
    });
  };

  return (
    <TouchableOpacity style={styles.authorCard} onPress={handlePress}>
      <Image source={{ uri: img }} style={styles.authorImage} />
      <Text
        style={[styles.authorName, { color: theme.colors.text }]}
        numberOfLines={2}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authorCard: {
    alignItems: "center",
    marginRight: 16,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  authorName: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    flexWrap: "wrap",
    width: 60,
  },
});

export default AuthorCard;
