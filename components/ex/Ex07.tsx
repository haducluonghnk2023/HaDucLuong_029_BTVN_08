import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  productId: string;
  name: string;
  quantity: number;
};

type Product = {
  productId: string;
  name: string;
};

const products: Product[] = [
  { productId: "a1", name: "Laptop" },
  { productId: "b2", name: "Điện thoại" },
  { productId: "c3", name: "Tai nghe" },
  { productId: "d4", name: "Chuột máy tính" },
];

export default function Ex07() {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = async (product: Product) => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      let currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const index = currentCart.findIndex(
        (item) => item.productId === product.productId
      );

      if (index >= 0) {
        currentCart[index].quantity += 1;
      } else {
        currentCart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(currentCart));
      setCart(currentCart);
    } catch (error) {
      console.log("Lỗi khi thêm sản phẩm vào giỏ:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>{item.name}</Text>
            <Button title="Thêm vào giỏ" onPress={() => addToCart(item)} />
          </View>
        )}
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
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productText: {
    fontSize: 16,
  },
  cartItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
