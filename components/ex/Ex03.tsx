import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Ex03() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("counter");
        if (storedValue !== null) {
          setCount(Number(storedValue));
        }
      } catch (error) {
        console.log("Lỗi khi lấy giá trị counter:", error);
      }
    };

    loadCount();
  }, []);

  const updateCount = async (newValue: number) => {
    try {
      setCount(newValue);
      await AsyncStorage.setItem("counter", newValue.toString());
    } catch (error) {
      console.log("Lỗi khi lưu counter:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="Tăng" onPress={() => updateCount(count + 1)} />
        <Button title="Giảm" onPress={() => updateCount(count - 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
});
