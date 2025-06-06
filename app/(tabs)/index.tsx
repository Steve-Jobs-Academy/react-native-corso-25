import ProductCard from "@/components/Card";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchData = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        if (data.length) {
            setProducts(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>

                <ScrollView>
                    <View>
                        {products?.length &&
                            products.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        paddingBottom: 96,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
