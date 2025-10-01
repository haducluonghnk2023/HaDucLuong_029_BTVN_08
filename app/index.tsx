import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, View } from "react-native";
import Ex01 from "@/components/ex/Ex01";
import Ex02 from "@/components/ex/Ex02";
import Ex03 from "@/components/ex/Ex03";
import Ex04 from "@/components/ex/Ex04";
import Ex05 from "@/components/ex/Ex05";
import Ex06 from "@/components/ex/Ex06";
import Ex07 from "@/components/ex/Ex07";
import Ex08 from "@/components/ex/Ex08";

const KEY_USERNAME = "username";
const KEY_USER = "user";

export default function index() {
  //   const saveStringData = async (key: string, value: string) => {
  //     try {
  //       await AsyncStorage.setItem(key, value);
  //       Alert.alert("Lưu dữ liệu thành công");
  //     } catch (error) {
  //       Alert.alert("Lưu dữ liệu không thành công");
  //     }
  //   };

  //   const saveObjectData = async (
  //     key: string,
  //     value: { id: number; name: string; age: number }
  //   ) => {
  //     try {
  //       const convertData = JSON.stringify(value);
  //       await AsyncStorage.setItem(key, convertData);
  //       Alert.alert("Lưu dữ liệu thành công");
  //     } catch (error) {
  //       Alert.alert("Lưu dữ liệu không thành công");
  //     }
  //   };

  //   const readStringData = async (key: string) => {
  //     try {
  //       const value = await AsyncStorage.getItem(key);
  //       if (value !== null) {
  //         console.log(`value : ${value}`);
  //       } else {
  //         Alert.alert(`Không có : ${key}`);
  //       }
  //     } catch (error) {
  //       Alert.alert("Đọc dữ liệu không thành công");
  //     }
  //   };

  //   const readObjectData = async (key: string) => {
  //     try {
  //       const value = await AsyncStorage.getItem(key);
  //       if (value !== null) {
  //         const parse = JSON.parse(value);
  //         console.log(parse);
  //       } else {
  //         Alert.alert(`Không có : ${key}`);
  //       }
  //     } catch (error) {
  //       Alert.alert("Đọc dữ liệu không thành công");
  //     }
  //   };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View>HoomScreen </View>
      <Button
        title="Lưu dữ liệu dạng chuỗi"
        onPress={() => saveStringData(KEY_USERNAME, "Nguyễn Văn C")}
      />
      <Button
        title="Lưu dữ liệu dạng object"
        onPress={() =>
          saveObjectData(KEY_USER, { id: 1, name: "Nguyễn Văn A", age: 18 })
        }
      />
      <Button
        title="Lấy dữ liệu string"
        onPress={() => readStringData(KEY_USERNAME)}
      />
      <Button
        title="Lấy dữ liệu object"
        onPress={() => readObjectData(KEY_USER)}
      /> */}
      {/* <Ex01 /> */}
      {/* <Ex02 /> */}
      {/* <Ex03 /> */}
      {/* <Ex04 /> */}
      {/* <Ex05 /> */}
      <Ex06 />
      {/* <Ex07 /> */}
      {/* <Ex08 /> */}
    </SafeAreaView>
  );
}
