import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Settings = {
  username: string;
  email: string;
  notificationsEnabled: boolean;
};

export default function Ex06() {
  const [settings, setSettings] = useState<Settings>({
    username: "Guest",
    email: "",
    notificationsEnabled: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem("appSettings");
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.log("Lỗi khi load settings:", error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem("appSettings", JSON.stringify(settings));
      } catch (error) {
        console.log("Lỗi khi lưu settings:", error);
      }
    };

    saveSettings();
  }, [settings]);

  const updateField = (key: keyof Settings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const resetSettings = async () => {
    const defaultSettings: Settings = {
      username: "Guest",
      email: "",
      notificationsEnabled: true,
    };
    setSettings(defaultSettings);
    await AsyncStorage.removeItem("appSettings");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt ứng dụng</Text>

      <Text>Tên hiển thị:</Text>
      <TextInput
        style={styles.input}
        value={settings.username}
        onChangeText={(val) => updateField("username", val)}
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={settings.email}
        onChangeText={(val) => updateField("email", val)}
      />

      <View style={styles.switchRow}>
        <Text>Nhận thông báo</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(val) => updateField("notificationsEnabled", val)}
        />
      </View>

      <Button title="Đặt lại cài đặt" onPress={resetSettings} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
});
