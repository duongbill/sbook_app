import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const truncateWords = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const DiscoveryCard = ({ title, description, image }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("DiscoveryCardChild", {
      title: title || "'Cọng rơm hy vọng' - đứng dậy sau vấp ngã",
      description:
        description ||
        "Từ mất niềm tin vì liên tiếp thất bại, làm ăn thua lỗ, nhân vật Seong Gon quyết thay đổi để vực dậy bản thân, trong 'Cọng rơm hy vọng'.",
      image: image,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {truncateWords(
              title || "'Cọng rơm hy vọng' - đứng dậy sau vấp ngã",
              10
            )}
          </Text>
          <Text style={styles.description}>
            {truncateWords(
              description ||
                "Từ mất niềm tin vì liên tiếp thất bại, làm ăn thua lỗ, nhân vật Seong Gon quyết thay đổi để vực dậy bản thân, trong 'Cọng rơm hy vọng'.",
              25
            )}
          </Text>
        </View>
        <Image
          source={image || require("../../assets/dcvimg.png")}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    margin: 20,
    height: 150,
    paddingRight: 130, // đẩy text sang phải tránh ảnh
    paddingVertical: 20,
    position: "relative", // cần để ảnh position absolute bám theo
  },

  image: {
    width: 100,
    height: 150,
    borderRadius: 20,
    position: "absolute",
    top: -20, // đẩy ảnh lên khỏi card
    left: 260, // đẩy ảnh sang trái khỏi card
  },

  textContainer: {
    flex: 1,
  },
  title: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
});

export default DiscoveryCard;
