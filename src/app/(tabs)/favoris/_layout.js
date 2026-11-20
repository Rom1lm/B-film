import { Stack } from "expo-router";

export default function FavorisLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Favoris" }} />
      <Stack.Screen name="[id]" options={{ title: "" }} />
    </Stack>
  );
}