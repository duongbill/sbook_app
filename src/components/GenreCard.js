import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Feather } from "@expo/vector-icons";

const GenreCard = ({ title }) => {
  const { theme } = useContext(ThemeContext);

  // Chọn icon và màu phù hợp với thể loại
  const getGenreStyle = (genreName) => {
    const name = genreName.toLowerCase();

    if (name.includes("hài") || name.includes("vui"))
      return { icon: "smile", color: "#FF9800" };

    if (name.includes("kịch") || name.includes("bi"))
      return { icon: "film", color: "#9C27B0" };

    if (name.includes("tình")) return { icon: "heart", color: "#E91E63" };

    if (name.includes("trinh thám"))
      return { icon: "search", color: "#2196F3" };

    if (name.includes("phiêu lưu"))
      return { icon: "compass", color: "#4CAF50" };

    if (name.includes("dân gian"))
      return { icon: "book-open", color: "#795548" };

    if (name.includes("kí sự")) return { icon: "edit", color: "#607D8B" };

    // Màu mặc định
    return { icon: "bookmark", color: theme.colors.primary };
  };

  const genreStyle = getGenreStyle(title);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View
        style={[
          styles.genreCard,
          {
            backgroundColor: genreStyle.color,
            borderColor:
              theme.mode === "dark" ? "rgba(255,255,255,0.1)" : "transparent",
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Feather name={genreStyle.icon} size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.genreText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginVertical: 4,
  },
  genreCard: {
    borderRadius: 15,
    padding: 10,
    minWidth: 140,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  genreText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    flex: 1,
  },
});

export default GenreCard;
