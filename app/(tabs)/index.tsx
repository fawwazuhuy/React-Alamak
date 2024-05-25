import { useState, useEffect } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
// import { Image } from "react-native-reanimated/lib/typescript/Animated";


const Page = () => {
  return (
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitle: 'Home'
    }}

    />
  )
}

// export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default function index() {
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    const response = await fetch("https://dewalaravel.com/api/places");
    const placesData = await response.json();

    setPlaces(placesData);
    console.log(placesData);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {places.data ? (
          places.data.map((place, index) => (

            <View key={index} style={styles.container}>
              <Image
                source={{
                  uri: place.photo,
                  cache: 'only-if-cached'
                }}
                style={{ width: 200, height: 200 }}
              />
              <Text>{place.name}</Text>
            </View>
            // <FlatList/>

          ))
        ) : (
          <Text>please wait</Text>
        )}
      </View>
    </ScrollView>
  );
}
