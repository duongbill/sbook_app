import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BookCard = () => (
    <View style={styles.bookCard}>
        <Image source={{ uri: 'https://placehold.co/80/png' }} style={styles.bookImage} />
        <Text style={styles.bookTitleSmall}>Come home to yourself</Text>
        <Text style={styles.bookAuthor}>by Bill</Text>
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
