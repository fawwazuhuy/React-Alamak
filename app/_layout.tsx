import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: "" }} />
      <Stack.Screen name="place/[slug]" options={{ headerShown: true, headerTitle:"Detail" }} />
      <Stack.Screen name="category/[categories]" options={{ headerShown: true, headerTitle:"Category"}} />
    </Stack>
  );
}
