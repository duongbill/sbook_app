
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const AuthorCard = ({ img, name }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.authorCard}>
            <Image source={{ uri: img }} style={styles.authorImage} />
            <Text
                style={[styles.authorName, { color: theme.colors.text }]}
                numberOfLines={2}
            >
                {name}
            </Text>
        </View>
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
