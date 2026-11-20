import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { chargerFilms } from "../../../api/films";
import FilmCard from "../../../components/FilmCard";

export default function ExplorerScreen() {
  const [films, setFilms] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    async function charger() {
      try {
        setChargement(true);
        setErreur(null);

        const donnees = await chargerFilms();

        setFilms(donnees);
      } catch (error) {
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
    }

    charger();
  }, []);

  if (chargement) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color="#FF5A5F" />
        <Text>Chargement des films...</Text>
      </View>
    );
  }

  if (erreur) {
    return (
      <View style={styles.centre}>
        <Text style={styles.erreur}>Erreur : {erreur}</Text>
      </View>
    );
  }

  if (films.length === 0) {
    return (
      <View style={styles.centre}>
        <Text>Aucun film disponible.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={films}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <Link href={`/films/${item.id}`} asChild>
          <Pressable>
            <FilmCard film={item} />
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  centre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  erreur: {
    color: "red",
    textAlign: "center",
  },
});