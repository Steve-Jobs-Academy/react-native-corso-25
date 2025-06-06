import { Product } from "@/types/products";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </TouchableOpacity>
    );
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
