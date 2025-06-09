import { Product } from "@/types/products";
import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => {
    return useMemo(() => {
        return (
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.cardContent}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text>{Math.random() * 1000}</Text>
                </View>
            </TouchableOpacity>
        );
    }, [product]);
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#ddd",
        marginBottom: 16,
    },
    cardContent: {
        gap: 16,
    },
    image: {
        width: "100%",
        height: 380,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
    },
});
