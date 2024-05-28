import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { fetchPlaces, fetchCategories, Place, Category } from '@/utils/api';
import { useRouter } from 'expo-router';

const Index = () => {
  const [data, setData] = useState<Place[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placesData, categoriesData] = await Promise.all([fetchPlaces(), fetchCategories()]);
        setData(placesData);
        setCategories(categoriesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.home}>
      <View style={styles.banner}>
        <Image source={require('../../assets/images/banner.png')} style={styles.bannerImage} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kategori</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => router.push(`/category/${category.slug}`)}
          >
            <Text style={styles.categoryButtonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rekomendasi</Text>
      </View>
      <View style={styles.container}>
        {data.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image source={{ uri: item.photo }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardCategory}>{item.category.name}</Text>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => router.push(`/place/${item.slug}`)}
              >
                <Text style={styles.cardButtonText}>Kunjungi</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    marginBottom: 10,
  },
  banner: {
    height: 220,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#dcdcdc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bannerImage: {
    height: 220,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  header: {
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ff4d4f',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardCategory: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Index;
