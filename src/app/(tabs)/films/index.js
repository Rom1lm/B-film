import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, FlatList, View, Pressable, ActivityIndicator } from "react-native";
import Film from "@/components/film";
import { chargerFilms, rechercherParCategorie, choisirMode, MODES } from "@/api/films";

const CATEGORIES = ["Toutes", "Comédie", "Drame", "Animation"];

export default function Films() {
  const [films, setFilms] = useState([]);
  const [statut, setStatut] = useState("chargement");
  const [erreur, setErreur] = useState(null);
  const [categorie, setCategorie] = useState("Toutes");
  const [mode, setMode] = useState("succes");

  // Numéro de la dernière requête : les réponses peuvent arriver dans le désordre,
  // on ignore celles qui ne sont pas la dernière demandée.
  const derniereRequete = useRef(0);

  const afficherResultat = (numero, requete) => {
    setStatut("chargement");
    setErreur(null);
    requete
      .then((data) => {
        if (numero !== derniereRequete.current) return; // réponse périmée
        setFilms(data);
        setStatut(data.length === 0 ? "vide" : "succes");
      })
      .catch((e) => {
        if (numero !== derniereRequete.current) return;
        setErreur(e.message);
        setStatut("erreur");
      });
  };

  // Charge tous les films (dépend du mode choisi)
  const charger = () => {
    const numero = ++derniereRequete.current;
    setCategorie("Toutes");
    afficherResultat(numero, chargerFilms());
  };

  // Charge une catégorie avec rechercherParCategorie
  const choisirCategorie = (nouvelleCategorie) => {
    const numero = ++derniereRequete.current;
    setCategorie(nouvelleCategorie);
    afficherResultat(numero, rechercherParCategorie(nouvelleCategorie));
  };

  const changerMode = (nouveauMode) => {
    choisirMode(nouveauMode);
    setMode(nouveauMode);
    charger();
  };

  useEffect(() => {
    charger();
  }, []);

  // Le contenu change selon le statut : chargement, erreur, vide ou succès
  let contenu;
  if (statut === "chargement") {
    contenu = (
      <View style={styles.centre}>
        <ActivityIndicator size="large" />
        <Text style={styles.videTexte}>Chargement des films…</Text>
      </View>
    );
  } else if (statut === "erreur") {
    contenu = (
      <View style={styles.centre}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.videTexte}>Impossible de charger les films</Text>
        <Text style={styles.detail}>{erreur}</Text>
        <Pressable onPress={charger} style={styles.bouton}>
          <Text style={styles.boutonTexte}>Réessayer</Text>
        </Pressable>
      </View>
    );
  } else if (statut === "vide") {
    contenu = (
      <View style={styles.centre}>
        <Text style={styles.emoji}>🎬</Text>
        <Text style={styles.videTexte}>Aucun film pour le moment</Text>
        <Pressable onPress={charger} style={styles.bouton}>
          <Text style={styles.boutonTexte}>Actualiser</Text>
        </Pressable>
      </View>
    );
  } else {
    contenu = (
      <FlatList
        data={films}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Film film={item} />}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          <Text style={styles.compteur}>
            {films.length} film{films.length > 1 ? "s" : ""}
          </Text>
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.ligneBoutons}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => choisirCategorie(c)}
            style={[styles.choix, categorie === c && styles.choixActif]}
          >
            <Text style={categorie === c ? styles.choixTexteActif : styles.choixTexte}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.ligneBoutons}>
        <Text style={styles.detail}>Mode :</Text>
        {MODES.map((m) => (
          <Pressable
            key={m}
            onPress={() => changerMode(m)}
            style={[styles.choixPetit, mode === m && styles.choixActif]}
          >
            <Text style={mode === m ? styles.choixTexteActif : styles.petitTexte}>{m}</Text>
          </Pressable>
        ))}
      </View>

      {contenu}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ligneBoutons: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 10,
    marginTop: 10,
  },
  choix: {
    backgroundColor: "lightgrey",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  choixPetit: {
    backgroundColor: "lightgrey",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  choixActif: {
    backgroundColor: "#ff5a60",
  },
  choixTexte: {
    color: "#333",
  },
  petitTexte: {
    fontSize: 12,
    color: "#333",
  },
  choixTexteActif: {
    color: "#fff",
    fontWeight: "bold",
  },
  compteur: {
    color: "gray",
    margin: 10,
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
  detail: {
    color: "gray",
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