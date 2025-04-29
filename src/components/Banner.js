import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const Banner = ({ uri }) => {
    const [loading, setLoading] = useState(true);
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (uri) {
            Image.getSize(uri,
                (width, height) => {
                    if (width && height) {
                        setAspectRatio(width / height);
                    }
                },
                (error) => {
                    console.error('Failed to get image size:', error);
                }
            );
        }
    }, [uri]);

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color="#999" />
            )}
            <Image
                source={{ uri }}
                style={[styles.image, { aspectRatio }]}
                onLoadEnd={() => setLoading(false)}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
        position: 'relative',
    },
    image: {
        width: '100%',
    },
});

export default Banner;
