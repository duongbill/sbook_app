import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const BookListItem = ({ image, title, author, rating, description }) => {
    const isLoading = !image || !title || !author;

    return (
        <View style={styles.bookListItem}>
            {isLoading ? (
                <View style={styles.loadingBox}>
                    <ActivityIndicator size="small" color="#999" />
                    <Text style={styles.loadingText}>Đang tải sách...</Text>
                </View>
            ) : (
                <>
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
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    bookListItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
        minHeight: 100, // giữ kích thước tối thiểu để không nhảy layout khi loading
        paddingHorizontal: 8,
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
    loadingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        flex: 1,
    },
    loadingText: {
        marginLeft: 8,
        color: 'gray',
        fontSize: 14,
    },
});

export default BookListItem;
