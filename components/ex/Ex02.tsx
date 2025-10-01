import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Ex02() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("darkMode");
        if (storedValue !== null) {
          setIsDarkMode(JSON.parse(storedValue));
        }
      } catch (error) {
        console.log("Lỗi khi lấy trạng thái dark mode:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleSwitch = async (value: boolean) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      console.log("Lỗi khi lưu dark mode:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={[styles.text, { color: isDarkMode ? "#fff" : "#000" }]}>
        Chế độ ban đêm
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
