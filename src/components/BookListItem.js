import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const BookListItem = ({ image, title, author, rating, description }) => (
    <View style={styles.bookListItem}>
        <Image source={{ uri: image }} style={styles.bookListImage} />
        <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{title}</Text>
            <Text style={styles.bookAuthor}>by {author}</Text>
            <Text style={styles.rating}>
                <AntDesign name="star" size={16} color="rgb(255,204,0)" /> {rating}
            </Text>
            <Text style={styles.bookDesc}>{description}</Text>
        </View>
        <Feather name="bookmark" size={20} color="gray" />
    </View>
);

const styles = StyleSheet.create({
    bookListItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    bookListImage: {
        width: 80,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookAuthor: {
        fontSize: 12,
        color: 'gray',
    },
    rating: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
    },
    bookDesc: {
        fontSize: 12,
        color: 'gray',
    },
});

export default BookListItem;
