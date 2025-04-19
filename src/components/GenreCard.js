import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GenreCard = ({ title }) => (
    <View style={styles.genreCard}>
        <Text style={styles.genreText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    genreCard: {
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 16,
        flex: 1,
        alignItems: 'center',
    },
    genreText: {
        fontWeight: 'bold',
    },
});

export default GenreCard;
