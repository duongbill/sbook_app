import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const BookCard = ({ title, author, image }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.bookCard}>
            <Image source={{ uri: image }} style={styles.bookImage} />
            <Text style={[styles.bookTitleSmall, { color: theme.colors.text }]}>
                {title}
            </Text>
            <Text style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}>
                by {author}
            </Text>
        </View>
    );
};

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
    },
});

export default BookCard;
