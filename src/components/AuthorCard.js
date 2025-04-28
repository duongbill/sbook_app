import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AuthorCard = ({ name }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("InfoAuthorScreen");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.authorCard}>
      <Image
        source={{ uri: "https://placehold.co/50/png" }}
        style={styles.authorImage}
      />
      <Text style={styles.authorName} numberOfLines={2}>
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
