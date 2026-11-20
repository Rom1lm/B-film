import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useStore } from "@/store/store";

export default function Film({ film }) {
  const router = useRouter();
  const segments = useSegments();

  // On ouvre la fiche dans l'onglet où on se trouve (films ou favoris)
  const ouvrirFiche = () => {
    const onglet = segments[1];
    router.push(`/${onglet}/${film.id}`);
  };

  const isFavorite = useStore((state) => state.isFavorite);
  const basculerfavs = useStore((state) => state.basculerfavs);
  const estFavori = isFavorite.some((fav) => fav.id === film.id);

  return (
    <Pressable onPress={ouvrirFiche} style={styles.card}>
      {film.image ? (
        <Image source={{ uri: film.image }} style={styles.img} />
      ) : (
        <View style={[styles.img, styles.pasImage]}>
          <Text style={styles.pasImageTexte}>🎬</Text>
        </View>
      )}
      <View style={styles.texte}>
        <Text style={styles.titre} numberOfLines={2}>{film.titre}</Text>
        <Text style={styles.detail}>{film.categorie} · {film.annee}</Text>
        <Text style={styles.detail}>{film.duree} min</Text>
      </View>
      <Pressable onPress={() => basculerfavs(film)} hitSlop={10}>
        <Text style={styles.coeur}>{estFavori ? "♥" : "♡"}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 10,
    paddingEnd: 15,
    borderRadius: 15,
    gap: 15,
    overflow: "hidden",
  },
  texte: {
    flex: 1,
    justifyContent: "center",
  },
  titre: {
    fontWeight: "bold",
  },
  detail: {
    color: "#555",
  },
  img: {
    height: 90,
    width: 120,
  },
  pasImage: {
    backgroundColor: "#bbb",
    alignItems: "center",
    justifyContent: "center",
  },
  pasImageTexte: {
    fontSize: 30,
  },
  coeur: {
    fontSize: 28,
    color: "#ff5a60",
  },
});