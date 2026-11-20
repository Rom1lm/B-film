import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useStore } from "../store/FavorisStore";

export default function FilmCard({ film }) {
    const estFavori = useStore((state) => 
        state.films.includes(film.id)
    );

    const basculerfavs = useStore((state) => state.basculerfavs);

    return (
        <View style={styles.card}>
            {film.image ? (
                <Image source={{ uri: film.image }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.placeholder]}>
                <Text style={styles.placeholderText}>Pas de photo</Text>
                </View>
            )}

            <View style={styles.row}>
                <Text style={styles.title} numberOfLines={2}>
                    {film.title}
                </Text>

                <Text style={styles.price}>{film.price} €</Text>

                <Pressable onPress={() => basculerfavs(film.id)}>
                    <Text style={styles.coeur}>
                        {estFavori ? "❤️" : "🤍"}
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.city}>{film.city}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    image: { width: "100%", aspectRatio: 16 / 9, borderRadius: 8 },
    placeholder: { backgroundColor: "#eee", alignItems: "center", justifyContent: "center" },
    placeholderText: { color: "#888" },
    row: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 8 },
    title: { flex: 1, fontSize: 16, fontWeight: "bold" },
    price: { fontSize: 16, fontWeight: "700" },
    city: { color: "gray", marginTop: 2 },
    coeur: {
        fontSize: 24,
        marginLeft: 8,
    },
});