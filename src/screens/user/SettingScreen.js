import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const settings = [
  { icon: 'person-outline', label: 'Thông tin cá nhân' },
  { icon: 'lock-closed-outline', label: 'Đổi mật khẩu' },
  { icon: 'notifications-outline', label: 'Thông báo' },
  { icon: 'language-outline', label: 'Ngôn ngữ' },
  { icon: 'moon-outline', label: 'Chế độ tối' },
  { icon: 'shield-checkmark-outline', label: 'Bảo mật' },
  { icon: 'help-circle-outline', label: 'Hỗ trợ từ kỹ thuật viên' },
  { icon: 'bookmarks-outline', label: 'Danh sách của tôi' },
  { icon: 'log-out-outline', label: 'Đăng xuất' },
];

const SettingScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token removed, logged out successfully.');
  
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.containerTab, {backgroundColor: theme.colors.bottomTabColor}]}>
        {/* Profile section */}
        <View style={[styles.profileContainer, {backgroundColor: theme.colors.surface}]}>
          <Image source={require('../../../assets/db.png')} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text style={[styles.name, {color: theme.colors.text}]}>Nguyen Hai Duong</Text>
            <Text style={[styles.username, {color: theme.colors.textSecondary}]}>@duongbill</Text>
            <Text style={[styles.balance, {color: theme.colors.text}]}>Số dư : 100,000đ</Text>
          </View>
          <TouchableOpacity style={[styles.editIcon, {backgroundColor: theme.colors.buttonSecondary}]}>
            <Icon name="pencil-outline" size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Setting items */}
        {settings.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.item, {borderBottomColor: theme.colors.text}]}
            onPress={() => {
              if (item.label === 'Đăng xuất') {
                handleLogout();
              } else if (item.label === 'Chế độ tối') {
                navigation.navigate('Mode');
              } else {
                navigation.navigate('Setting');
              }
            }}>
            <View style={styles.iconLabel}>
              <View style={[styles.icon, {borderColor: theme.colors.text}]}>
                <Icon name={item.icon} size={20} style={[{color: theme.colors.text}]} />
              </View>
              <Text style={[styles.label, {color:theme.colors.text}]}>{item.label}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        ))}
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTab: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 60
  },
  profileContainer: {
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  profileText: {
    marginLeft: 10,
    flex: 1,
    gap: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    color: '#666',
    fontSize: 13,
  },
  balance: {
    fontSize: 13,
    marginTop: 4,
  },
  editIcon: {
    position: 'absolute',
    // top: 10,
    right: 10,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 2,
    marginLeft: 15,
    marginRight: 15,
  },
  iconLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    margin: 4,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
  },
});

export default SettingScreen;
