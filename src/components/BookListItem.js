import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext'; // Cập nhật đường dẫn

const BookListItem = ({ image, title, author, rating, description }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.bookListItem}>
            <Image source={{ uri: image }} style={styles.bookListImage} />
            <View style={styles.bookInfo}>
                <Text style={[styles.bookTitle, { color: theme.colors.text }]}>{title}</Text>
                <Text style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}>
                    by {author}
                </Text>
                <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                    <AntDesign name="star" size={16} color="rgb(255,204,0)" /> {rating}
                </Text>
                <Text style={[styles.bookDesc, { color: theme.colors.textSecondary }]}>
                    {description}
                </Text>
            </View>
            <Feather name="bookmark" size={20} color={theme.colors.textSecondary} />
        </View>
    );
};

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
    },
    rating: {
        fontSize: 12,
        marginVertical: 2,
    },
    bookDesc: {
        fontSize: 12,
    },
});

export default BookListItem;
