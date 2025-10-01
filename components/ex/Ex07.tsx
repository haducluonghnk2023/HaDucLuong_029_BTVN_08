import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  productId: string;
  name: string;
  quantity: number;
};

export default function Ex07() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load giỏ hàng khi mở app
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.log("Lỗi khi load giỏ hàng:", error);
      }
    };

    loadCart();
  }, []);

  // Hàm thêm vào giỏ
  const addToCart = async (product: { productId: string; name: string }) => {
    try {
      // Lấy giỏ hiện tại từ AsyncStorage
      const storedCart = await AsyncStorage.getItem("cart");
      let currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      // Kiểm tra sản phẩm đã tồn tại chưa
      const index = currentCart.findIndex(
        (item) => item.productId === product.productId
      );

      if (index >= 0) {
        // Nếu có rồi -> tăng số lượng
        currentCart[index].quantity += 1;
      } else {
        // Nếu chưa -> thêm mới
        currentCart.push({ ...product, quantity: 1 });
      }

      // Lưu lại vào AsyncStorage
      await AsyncStorage.setItem("cart", JSON.stringify(currentCart));

      // Cập nhật state
      setCart(currentCart);
    } catch (error) {
      console.log("Lỗi khi thêm sản phẩm vào giỏ:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn hình sản phẩm</Text>

      {/* Giả lập danh sách sản phẩm */}
      <Button
        title="Thêm Laptop vào giỏ"
        onPress={() => addToCart({ productId: "a1", name: "Laptop" })}
      />
      <Button
        title="Thêm Điện thoại vào giỏ"
        onPress={() => addToCart({ productId: "b2", name: "Điện thoại" })}
      />

      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <Text style={styles.cartItem}>
            {item.name} - SL: {item.quantity}
          </Text>
        )}
      />
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
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
  cartItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
