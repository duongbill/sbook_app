import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ModeScreen = () => {
  const { themeMode, setTheme, theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [selected, setSelected] = useState(themeMode); // local state

  const handleConfirm = () => {
    setTheme(selected); // áp dụng theme
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={20} style={[styles.backText, { color: theme.colors.text }]} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Chế độ</Text>
      </View>

      {/* Sub Title */}
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Ngôn ngữ</Text>

      {/* Radio Buttons */}
      <View style={styles.radioGroup}>
        {['light', 'dark'].map((mode) => (
          <Pressable
            key={mode}
            style={styles.radioItem}
            onPress={() => setSelected(mode)}
          >
            <Text style={{ color: theme.colors.text }}>
              {mode === 'light' ? 'Sáng' : 'Tối'}
            </Text>
            <View style={styles.radioCircle}>
              {selected === mode && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={[styles.confirmButton, { backgroundColor: theme.colors.primary }]} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
    position: 'relative',
  },
  backText: {
    fontSize: 20,
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  radioGroup: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginBottom: 32,
  },
  radioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  confirmButton: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModeScreen;
