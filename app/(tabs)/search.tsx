import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchPlaces, Place } from '@/utils/api';



const Search = () => {
  const [data, setData] = useState<Place[]>([]);
  const [filteredData, setFilteredData] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesData = await fetchPlaces();
        setData(placesData);
        setFilteredData(placesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter(place => place.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };
  
  const handleCancel = () => {
    setQuery('');
    setFilteredData(data);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                value={query}
                onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text>X</Text>
            </TouchableOpacity>
        </View>
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => router.push(`/place/${item.slug}`)}>
            <Image source={{ uri: item.photo }} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Warna latar belakang yang lebih lembut
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#e74c3c', // Warna merah yang lebih menarik
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '600', // Menambahkan ketebalan font
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingTop: 20,
    gap: 12,
  },
  cancelButton: {
    marginTop: 2,
    padding: 10,
    backgroundColor: '#ffff', // Warna tombol cancel
    borderRadius: 5,
  },
  searchBar: {
    height: 45,
    borderColor: '#bdc3c7', // Warna border yang lebih lembut
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '80%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  itemTextContainer: {
    flex: 1, // Menambahkan flex agar teks mengambil ruang yang tersisa
    marginLeft: 15,
    paddingRight: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50', // Warna teks yang lebih gelap dan elegan
  },
  itemCategory: {
    marginTop: 8,
    fontSize: 14,
    color: '#7f8c8d', // Warna teks kategori yang lebih lembut
  },
});



export default Search;