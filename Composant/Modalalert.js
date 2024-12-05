import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import ApiUrl from './ApiUrl';
import axios from 'axios';

const Modalalert = ({modalVisible,setModalVisible,handlePress}) => {
    const [Data, SetData] = useState('');
    const urls = ApiUrl({ endpoint: `getalert` });


    const fetchUserData = async () => {
        // if (Loading) return; // Éviter les requêtes multiples
       // var userids = await AsyncStorage.getItem('key');
     
      
         try {
        
     
           const url = ApiUrl({ endpoint: `getalert` });
        // getuserpage/1?page=1&per_page=100
          
           const response = await axios.get(url);
           const newData = response.data;
           console.log(response.data)
        
             SetData(newData);
            
            
           //}
         
     
     
           
         } catch (error) {
           console.error('Error fetching user data:', error);
         } finally {
          
         }
       };

       useEffect(() => {
        fetchUserData()
       
      }, []);



 // const data = [
  //  { id: '1', contenu: 'Je suis en danger' },
   // { id: '2', contenu: 'Je suis hospitalisé' },
   // { id: '3', contenu: 'Je suis en classe' },
  //  { id: '4', contenu: 'Je suis à l\'école' }
 // ];

 // // <Button title="Afficher les alertes" onPress={() => setModalVisible(true)} />

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.contenu)} style={styles.item}>
      <Text style={styles.itemText}>{item.contenu}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Liste Alertes</Text>
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%', // Largeur du modal
    maxHeight: '70%', // Limite la hauteur du modal
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color:COLORS.grey
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    width: '100%', // Largeur de l'élément à 100%
    display: 'flex', // Assure que le conteneur s'étend
    flexDirection: 'row', // Arranger le texte dans une ligne
    alignItems: 'center', // Centrer le texte verticalement
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1, 
    color:COLORS.blanccasse// Permet au texte de s'étendre
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: COLORS.rouge,
    borderRadius: 10,
    padding: 10,
    width: '90%', // Largeur du bouton "Fermer"
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Modalalert;