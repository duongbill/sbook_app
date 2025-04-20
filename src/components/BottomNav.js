import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const navItems = [
    { name: 'home', label: 'Trang chủ', iconLib: AntDesign, iconName: 'home', screen: 'HomeScreen' },
    { name: 'find', label: 'Khám phá', iconLib: Ionicons, iconName: 'search', screen: 'FindScreen' },
    { name: 'bookmark', label: 'Sách của tôi', iconLib: Ionicons, iconName: 'bookmark-outline', screen: 'BookmarkScreen' },
    { name: 'person', label: 'Tôi', iconLib: Ionicons, iconName: 'person-outline', screen: 'ProfileScreen' },
];

const BottomNav = () => {
    const [selected, setSelected] = useState('home');
    const navigation = useNavigation();

    const handleNavigation = async (item) => {
        if (selected !== item.name) {
            // Điều hướng sang màn hình tương ứng
            // await navigation.navigate(item.screen);

            // Delay một chút để đảm bảo transition chạy xong
            setTimeout(() => {
                setSelected(item.name);
            }, 100); // hoặc 300ms tùy theo animation của bạn
        }
    };

    return (
        <View style={styles.bottomNav}>
            {navItems.map((item) => {
                const isSelected = selected === item.name;
                const Icon = item.iconLib;
                return (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.navItem}
                        onPress={() => handleNavigation(item)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconWrapper}>
                            {isSelected && <View style={styles.topIndicator} />}
                            <Icon
                                name={item.iconName}
                                size={24}
                                color={isSelected ? 'black' : 'gray'}
                            />
                        </View>
                        <Text style={[styles.label, { color: isSelected ? 'black' : 'gray' }]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // paddingVertical: 10,
        // paddingBottom: 30,
        padding: 10,
        margin: 10,
        borderWidth: 0,

        bottom: 10,
        backgroundColor: '#E1DBCA',
        borderRadius: 20,

    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    topIndicator: {
        position: 'absolute',
        top: -8,
        width: 24,
        height: 3,
        backgroundColor: 'black',
        borderRadius: 2,
    },
    label: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default BottomNav;
