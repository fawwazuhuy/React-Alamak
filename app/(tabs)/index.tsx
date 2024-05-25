import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

const Page = () => {
  return (
    <Stack.Screen
      options={{
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitle: 'Home',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  searchbar: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemText: {
    fontSize: 18,
  },
});

export default function Index() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const getPlaces = async () => {
    const response = await fetch("https://dewalaravel.com/api/places");
    const placesData = await response.json();
    setPlaces(placesData.data);
    setFilteredPlaces(placesData.data);
    console.log(placesData);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = places.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, marginTop: 40, paddingHorizontal: 16, backgroundColor: '#F5F5F5' }}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Cari"
            onChangeText={handleSearch}
            value={searchQuery}
            onIconPress={() => {
              setSearchQuery('');
              handleSearch('');
            }}
            style={styles.searchbar}
          />
        </View>
        <View style={styles.container}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image
                  source={{ uri: place.photo }}
                  style={styles.image}
                />
                <Text style={styles.itemText}>{place.name}</Text>
              </View>
            ))
          ) : (
            <Text>Silakan tunggu...</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
