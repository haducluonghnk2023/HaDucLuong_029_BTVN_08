import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Ex01() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setSavedName(storedName);
        }
      } catch (error) {
        console.log("Lỗi khi lấy tên:", error);
      }
    };

    loadName();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("userName", name);
      setSavedName(name);
      setName("");
    } catch (error) {
      console.log("Lỗi khi lưu tên:", error);
    }
  };

  return (
    <View style={styles.container}>
      {savedName ? (
        <Text style={styles.welcome}>Chào mừng trở lại, {savedName}!</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên của bạn"
            value={name}
            onChangeText={setName}
          />
          <Button title="Lưu" onPress={handleSave} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
