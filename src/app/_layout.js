import { Stack } from "expo-router";
import { FavorisProvider } from "@/context/favorisContext";

export default function RootLayout() {
  return (
    <FavorisProvider>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    </FavorisProvider>
  );
}