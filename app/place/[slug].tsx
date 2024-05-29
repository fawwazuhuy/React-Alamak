import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const PlaceDetail = () => {
  const { slug } = useLocalSearchParams();
  const [place, setPlace] = useState<any>(null);

  const getPlace = async () => {
    const response = await fetch(`https://dewalaravel.com/api/places/${slug}`);
    const placeData = await response.json();
    setPlace(placeData.data);
  };

  useEffect(() => {
    getPlace();
  }, [slug]);

  if (!place) {
    return <Text>Mohon Tunggu</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: place.photo }} style={styles.image} />
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.description}>{place.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default PlaceDetail;
