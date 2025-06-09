import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/products";

import { useCallback, useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();

    const [searchDisabled, setSearchDisabled] = useState(false);

    const fetchData = useCallback(async () => {
        setProducts(undefined);
        setFilteredProducts(undefined);

        setTimeout(async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                if (data.length) {
                    setProducts(data);
                    setFilteredProducts(data);
                }
            } catch (error) {}
        }, 2000);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ThemedText style={styles.title} type="title">
                Home
            </ThemedText>

            {/* SEARCH */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Cerca un prodotto..."
                    style={[
                        styles.searchInput,
                        searchDisabled && styles.searchInputDisabled,
                    ]}
                    editable={!searchDisabled}
                    onChangeText={(text) =>
                        setFilteredProducts(
                            products?.filter(({ title }) =>
                                title.toLowerCase().includes(text.toLowerCase())
                            )
                        )
                    }
                />

                <Switch
                    value={!searchDisabled}
                    onValueChange={(value) => setSearchDisabled(!value)}
                />
            </View>

            {filteredProducts ? (
                filteredProducts.length ? (
                    <FlatList
                        data={filteredProducts}
                        style={styles.cardsContainer}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                onPress={() =>
                                    router.navigate(`/product/?id=${item.id.toString()}`)
                                }
                            />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={!products}
                                onRefresh={fetchData}
                            />
                        }
                    />
                ) : (
                    <Text style={styles.fetchMessages}>
                        {!products?.length
                            ? "Nessun prodotto"
                            : "Nessun prodotto trovato"}
                    </Text>
                )
            ) : (
                <ActivityIndicator />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
    },

    cardsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 48,
    },

    title: {
        paddingHorizontal: 16,

        fontWeight: "bold",
    },

    //SEARCH
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginHorizontal: 16,
    },

    searchInput: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },

    searchInputDisabled: {
        color: "#888",
        backgroundColor: "#dddddd",
    },

    //FETCH MESSAGE
    fetchMessages: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 16,
        color: "#888",
    },
});
