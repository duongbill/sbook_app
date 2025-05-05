import { StyleSheet, Text, View } from "react-native";

const IntroTab = () => {
  return (
    <View>
    <Text style={styles.content}>
    Là một cuốn sách truyền cảm hứng về hành trình tự khám phá, chữa lành và phát triển bản thân. Cuốn sách hướng dẫn người đọc tìm về chính mình thông qua chánh niệm, lòng biết ơn và sự kết nối với nội tâm. Tác giả chia sẻ những câu chuyện cá nhân, bài học cuộc sống và các bài tập thực hành giúp người đọc nhận ra giá trị của bản thân, tìm thấy sự bình yên trong tâm hồn và sống một cuộc đời ý nghĩa hơn.
    </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
});

export default IntroTab;