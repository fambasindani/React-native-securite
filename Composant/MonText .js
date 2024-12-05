import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../Couleurs/COLORS';

const MonText = ({label, desisnation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.name}>{desisnation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingBottom:10,
    backgroundColor: COLORS.blanccasse,
    borderRadius: 10,
    // Suppression des propriétés d'ombre
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 0, // Pour Android, suppression de l'ombre
    alignSelf: 'flex-start', // Aligner le conteneur à gauche
  },
  label: {
    fontSize: 20,
   // fontWeight: 'bold',
    color: COLORS.grey,
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.rouge,
    marginBottom: 5,
  },
});

export default MonText;