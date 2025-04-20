import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BookCard = ({ title, author, image }) => (
    <View style={styles.bookCard}>
        <Image source={{ uri: image }} style={styles.bookImage} />
        <Text style={styles.bookTitleSmall}>{title}</Text>
        <Text style={styles.bookAuthor}>by {author}</Text>
    </View>
);

const styles = StyleSheet.create({
    bookCard: {
        width: 120,
        marginRight: 12,
    },
    bookImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    bookTitleSmall: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    bookAuthor: {
        fontSize: 12,
        color: 'gray',
    },
});

export default BookCard;
