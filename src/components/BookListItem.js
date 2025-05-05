import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const BookListItem = ({ id, image, title, author, rating, description, navigation }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('BookDetail', { bookId: id })} style={[styles.bookListItem, { backgroundColor: theme.colors.surface }]}>
            {/* Shadow Wrapper */}
            <View style={styles.imageShadowWrapper}>
                <Image source={{ uri: image }} style={styles.bookListImage} />
            </View>

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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bookListItem: {
        position: 'relative',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        height: 100,
        bottom: -10,
        left: 5,
        right: 10,
    },

    imageShadowWrapper: {
        position: 'absolute',
        top: -10,
        left: -10,
        width: 80,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#fff', // bắt buộc cho iOS shadow

        // Android shadow
        elevation: 6,

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    bookListImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },

    bookInfo: {
        flex: 1,
        marginLeft: 70,
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
