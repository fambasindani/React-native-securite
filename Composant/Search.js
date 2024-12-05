import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Couleurs/COLORS';
import Listeamis from '../Composant/Listeamis';
import Websocketscreen from './Websocketscreen';

const Listeusercreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const act = () => {
    // Logique pour le bouton "+"
  };

  return (
    <View style={styles.complet}>
      <Websocketscreen />

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Recherche"
              value={searchText}
              onChangeText={handleSearch}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <Icon name="close" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
             <TouchableOpacity style={styles.addButton} onPress={act}>
            <Icon name="add" style={styles.addButtonIcon} />
          </TouchableOpacity>
          </View>
         
        </View>

        <Listeamis mydata={[]} fetchUserData={() => {}} SetLoading={() => {}} Loading={false} handleConfirm={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  complet: {
    backgroundColor: COLORS.blanccasse,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    width: '95%',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blanccasse,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    paddingLeft: 8,
  },
  searchIcon: {
    fontSize: 24,
    color: '#ccc',
    marginRight: 8,
  },
  clearIcon: {
    fontSize: 24,
    color: '#ccc',
    marginLeft: 8,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: COLORS.blanccasse,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    fontSize: 24,
    color: COLORS.black,
  },
});

export default Listeusercreen;