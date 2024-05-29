import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

const CategoryList = () => {
    const { categories } = useLocalSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://dewalaravel.com/api/categories/${categories}/places`)
            .then(response => response.json())
            .then(data => {
                setData(data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {data.map((item: any) => (
                    <View key={item.id} style={styles.card}>
                        <TouchableOpacity onPress={() => router.push(`/place/${item.slug}`)}>
                            <Image source={{ uri: item.photo }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 18,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        padding: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    description: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 8,
    },
});

export default CategoryList;
