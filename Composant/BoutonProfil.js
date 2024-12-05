import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Couleurs/COLORS';

const BoutonProfil = ({ onModifier, onSupprimer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.firstButton]} onPress={onModifier}>
        <Icon name="edit" size={35} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onSupprimer}>
        <Icon name="delete" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Aligner les éléments au centre verticalement
    justifyContent: 'flex-start', // Aligner les boutons à gauche
    padding: 10,
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.rouge, // Couleur de fond pour les boutons
    padding: 8, // Ajuster le padding pour réduire la taille
    borderRadius: 15,
    alignItems: 'center',
  },
  firstButton: {
    marginLeft: 20, // Ajouter un marginLeft de 20 uniquement au premier bouton
    marginRight: 50, // Ajouter un marginRight de 30 pour l'espace entre les boutons
  },
});

export default BoutonProfil;