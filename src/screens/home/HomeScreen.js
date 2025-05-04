import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Section from '../../components/Section';
import BookCard from '../../components/BookCard';
import BookListItem from '../../components/BookListItem';
import AuthorCard from '../../components/AuthorCard';
import GenreCard from '../../components/GenreCard';
import { ThemeContext } from '../../context/ThemeContext';

import {
    getPopularBooks,
    getAuthors,
    getGenres,
    getNewBooks,
    getBooksByGenre,
} from '../../api/api';

const HomeScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

    const [popularBooks, setPopularBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [businessBooks, setBusinessBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -120],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [popular, authorsData, genreData, newB, business] = await Promise.all([
                    getPopularBooks(),
                    getAuthors(),
                    getGenres(),
                    getNewBooks(),
                    getBooksByGenre('Kinh doanh'),
                ]);

                setPopularBooks(popular);
                setAuthors(authorsData);
                setGenres(genreData);
                setNewBooks(newB);
                setBusinessBooks(business);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.text} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <Animated.View
                style={[
                    styles.header,
                    {
                        backgroundColor: theme.colors.surface,
                        transform: [{ translateY: headerTranslateY }],
                    },
                ]}
            >
                <Image source={{ uri: 'https://placehold.co/40/png' }} style={styles.avatar} />
                <Text style={[styles.greeting, { color: theme.colors.text }]}>Xin chào, Duy Anh</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SearchTab', { screen: 'Search' })}>
                    <Feather name="search" size={24} color={theme.colors.text} style={styles.searchIcon} />
                </TouchableOpacity>
            </Animated.View>

            {/* Scrollable Content */}
            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: 120, paddingBottom: 60, paddingHorizontal: 16 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <Section title="Sách phổ biến">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {popularBooks.map((book) => (
                            <BookCard key={book.id} title={book.title} author={book.author} image={book.image} />
                        ))}
                    </ScrollView>
                </Section>

                <Section title="Tác giả nổi tiếng">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {authors.map((author) => (
                            <AuthorCard key={author.id} img={author.image} name={author.name} />
                        ))}
                    </ScrollView>
                </Section>

                <Section title="Thể loại">
                    <View style={styles.genreRow}>
                        {genres.map((genre) => (
                            <GenreCard key={genre.id} title={genre.name} />
                        ))}
                    </View>
                </Section>

                <Section title="Sách mới">
                    {newBooks.map((book) => (
                        <BookListItem
                            key={book.id}
                            image={book.image}
                            title={book.title}
                            author={book.author}
                            rating={book.rating}
                            description={book.description}
                        />
                    ))}
                </Section>

                <Section title="Sách kinh doanh">
                    {businessBooks.map((book) => (
                        <BookListItem
                            key={book.id}
                            image={book.image}
                            title={book.title}
                            author={book.author}
                            rating={book.rating}
                            description={book.description}
                        />
                    ))}
                </Section>
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 40,
        left: 10,
        right: 10,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    greeting: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchIcon: {
        padding: 4,
    },
    genreRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
