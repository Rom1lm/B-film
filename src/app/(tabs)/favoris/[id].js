import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { chargerFilm } from "@/api/films";
import { useStore } from "@/store/store";

export default function FicheFavori() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [film, setFilm] = useState(null);
  const [statut, setStatut] = useState("chargement");

  const isFavorite = useStore((state) => state.isFavorite);
  const basculerfavs = useStore((state) => state.basculerfavs);

  // On charge le film à partir de l'id de l'adresse
  const charger = () => {
    setStatut("chargement");
    chargerFilm(id)
      .then((data) => {
        setFilm(data);
        setStatut("succes");
      })
      .catch((e) => {
        setStatut(e.message === "introuvable" ? "introuvable" : "erreur");
      });
  };

  useEffect(() => {
    charger();
  }, [id]);

  if (statut === "chargement") {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (statut === "introuvable") {
    return (
      <View style={styles.centre}>
        <Stack.Screen options={{ title: "Introuvable" }} />
        <Text style={styles.emoji}>🎬</Text>
        <Text style={styles.videTexte}>Ce film n'existe pas ({id})</Text>
        <Pressable onPress={() => router.replace("/favoris")} style={styles.bouton}>
          <Text style={styles.boutonTexte}>Retour aux favoris</Text>
        </Pressable>
      </View>
    );
  }
  if (statut === "erreur") {
    return (
      <View style={styles.centre}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.videTexte}>Impossible de charger le film</Text>
        <Pressable onPress={charger} style={styles.bouton}>
          <Text style={styles.boutonTexte}>Réessayer</Text>
        </Pressable>
      </View>
    );
  }

  const estFavori = isFavorite.some((fav) => fav.id === film.id);

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: film.titre }} />
      {film.image ? (
        <Image source={{ uri: film.image }} style={styles.img} />
      ) : (
        <View style={[styles.img, styles.pasImage]}>
          <Text style={styles.emoji}>🎬</Text>
        </View>
      )}

      <View style={styles.infos}>
        <View style={styles.ligneTitre}>
          <Text style={styles.titre}>{film.titre}</Text>
          <Pressable onPress={() => basculerfavs(film)} hitSlop={10}>
            <Text style={styles.coeur}>{estFavori ? "♥" : "♡"}</Text>
          </Pressable>
        </View>
        <Text style={styles.detail}>{film.categorie} · {film.annee} · {film.duree} min</Text>
        <Text style={styles.detail}>Réalisé par {film.realisateur}</Text>
        <Text style={styles.synopsis}>{film.synopsis}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: 220,
  },
  pasImage: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  infos: {
    padding: 20,
    gap: 8,
  },
  ligneTitre: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titre: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  coeur: {
    fontSize: 32,
    color: "#ff5a60",
  },
  detail: {
    fontSize: 16,
    color: "gray",
  },
  synopsis: {
    fontSize: 16,
    marginTop: 8,
  },
  centre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 40,
  },
  videTexte: {
    fontSize: 16,
    color: "#555",
  },
  bouton: {
    backgroundColor: "#ff5a60",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  boutonTexte: {
    color: "#fff",
    fontWeight: "bold",
  },
});