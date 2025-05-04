import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const RadioButtonGroup = ({ options, selected = [], onSelect, icon }) => {
    const { theme } = useContext(ThemeContext);
    const handlePress = (option) => {
        // Đảm bảo selected luôn là mảng
        const updatedSelected = Array.isArray(selected) ? [...selected] : [];

        if (updatedSelected.includes(option)) {
            // Bỏ chọn
            onSelect(updatedSelected.filter(item => item !== option));
        } else {
            // Chọn thêm
            onSelect([...updatedSelected, option]);
        }
    };

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionRow}
                    onPress={() => handlePress(option)}
                >
                    <Text style={[styles.label, { color: theme.colors.text }]}>{option}</Text>
                    <View style={styles.right}>
                        {icon && index === 0 && (
                            <Ionicons name={icon} size={20} style={{ marginRight: 8 }} />
                        )}
                        <View style={[styles.radioOuter, { borderColor: theme.colors.text }]}>
                            {selected.includes(option) && <View style={[styles.radioInner, { backgroundColor: theme.colors.text }]} />}
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});
