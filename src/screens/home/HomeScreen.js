import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Section from '../../components/Section';
import BookCard from '../../components/BookCard';
import BookListItem from '../../components/BookListItem';
import AuthorCard from '../../components/AuthorCard';
import GenreCard from '../../components/GenreCard';
import BottomNav from '../../components/BottomNav';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: 'https://placehold.co/40/png' }} style={styles.avatar} />
                <Text style={styles.greeting}>Xin chào, Duy Anh</Text>
                <Feather name="search" size={24} color="black" style={styles.searchIcon} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Section title="Sách phổ biến">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Array(2).fill(null).map((_, i) => (
                            <BookCard key={i} />
                        ))}
                    </ScrollView>
                </Section>

                <Section title="Tác giả nổi tiếng">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {['Đặng Lê Nguyên Vũ', 'Nguyễn Nhật Ánh', 'Minh Long'].map((name, i) => (
                            <AuthorCard key={i} name={name} />
                        ))}
                    </ScrollView>
                </Section>

                <Section title="Thể loại">
                    <View style={styles.genreRow}>
                        <GenreCard title="Sách kinh doanh" />
                        <GenreCard title="Sách kỹ năng" />
                    </View>
                </Section>

                <Section title="Sách mới">
                    {Array(3).fill(null).map((_, i) => (
                        <BookListItem
                            key={i}
                            image="https://placehold.co/80/png"
                            title="Come home to yourself"
                            author="Bill"
                            rating={4.5}
                            description="This is a brief description of the book, showing some content."
                        />
                    ))}
                </Section>

                <Section title="Sách kinh doanh">
                    {Array(3).fill(null).map((_, i) => (
                        <BookListItem
                            key={i}
                            image="https://placehold.co/80/png"
                            title="Come home to yourself"
                            author="Bill"
                            rating={4.5}
                            description="This is a brief description of the book, showing some content."
                        />
                    ))}
                </Section>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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
    },
});

export default HomeScreen;
