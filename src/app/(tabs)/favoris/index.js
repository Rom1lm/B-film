import { FlatList, Text, View, StyleSheet } from "react-native";
import Film from "@/components/film";
import { useStore } from "@/store/store";

export default function Favoris() {
  const isFavorite = useStore((state) => state.isFavorite);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={isFavorite}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Film film={item} />}
      ListHeaderComponent={<Text style={styles.titre}>Mes favoris</Text>}
      ListEmptyComponent={
        <View style={styles.vide}>
          <Text style={styles.videTexte}>Aucun favori pour l'instant</Text>
          <Text style={styles.videAide}>Touchez ♡ sur un film pour l'ajouter ici</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 16,
  },
  vide: {
    alignItems: "center",
    marginTop: 60,
    gap: 8,
  },
  videTexte: {
    fontSize: 16,
    color: "#555",
  },
  videAide: {
    color: "gray",
  },
});