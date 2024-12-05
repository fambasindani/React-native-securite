import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image, Platform } from 'react-native';
import COLORS from '../Couleurs/COLORS';

import Icon from 'react-native-vector-icons/FontAwesome';
import Listeamis from '../Composant/Listeamis';
import axios from 'axios';
import ApiUrl from '../Composant/ApiUrl';

import Listenotification from '../Composant/Listenotification';

import Listealerte from '../Composant/Listealerte';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Messagebox from '../Composant/Messagebox';
import Localisation from '../Composant/Localisation';
import Localisations from '../Composant/Localisations';
import Websocketscreen from './Websocketscreen';
import Listeusers from '../Composant/Listeusers';
import Adduserscreen from './Adduserscreen';
import { useFocusEffect } from '@react-navigation/native';
import Listeadminalert from '../Composant/Listeadminalert';
import { StatusBar } from 'expo-status-bar';




const Listeadminalertscreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedText, setSelectedText] = useState('');

  const [verficationami, setverficationami] = useState(true);
  const [verficationnotic, setverficationnotic] = useState(false);
  const [verficationalert, setverficationalert] = useState(false);
  const [couleurb, setcouleurb] = useState(false);
  const [couleurdemande, setcouleurdemande] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentpage, setcurrentpage] = useState(0);
  const [Loading, SetLoading] = useState(false);
  const [userid, setuserid] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('')
  const [modalVisible, SetmodalVisible] = useState(false)
  const [selected, Setselected] = useState(null)
  const [monid, Setmonid] = useState('');
  
  useEffect(() => {
    fetchlocalisation()
    //setuserid()
   // fetchUserData();
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      setUserData([]); // Réinitialiser les données
      setcurrentpage(0); // Réinitialiser la page
     // fetchUserData(); // Appeler la fonction de récupération des données
    }, [])
  );
  const fetchlocalisation = async () => {

    const userids = await AsyncStorage.getItem('key');
    //Setverification(true)
         // Alert.alert(userids)      
    Setmonid(userids)
  }
 

  const fetchUserData = async () => {
   // if (Loading) return; // Éviter les requêtes multiples
  // var userids = await AsyncStorage.getItem('key');

   const nextpage=currentpage+1;

    SetLoading(true);
    try {
   

      const urls = ApiUrl({ endpoint: `getalert` });
   // getuserpage/1?page=1&per_page=100
     // const url = `${urls}?page=${nextpage}&per_page=10`;
      const response = await axios.get(urls);
      const newData = response.data;
      setUserData(newData)
      console.log(newData)
   
        //setcurrentpage(nextpage);
       // setUserData((prevData) => prevData.concat(newData));
       // SetLoading(false);
      //}
    


      
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      SetLoading(false);
    }
  };



 
   

  

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = userData.filter((item) => {
    const nom = item.contenu ? item.contenu.toLowerCase() : ''; // Vérifie si nom existe
   // const prenom = item.prenom ? item.prenom.toLowerCase() : ''; // Vérifie si prenom existe
  
    return nom.includes(searchText.toLowerCase()) || prenom.includes(searchText.toLowerCase());
  });
  
  const clearSearch = () => {
    setSearchText('');
  };



  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };


  const handleConfirms = async () => {
  SetmodalVisible(false)
  const item=selected
  
  await deleteUser(item) 
 /// Alert.alert(item.nom)
  }

 
  const handleConfirm = async (item) => {
    //setcouleurdemande(true)
    //setShowSuccessModal(true);
   // SetmodalVisible(true)
   //Setselected(item)
  // Setmessage(`Voulez-vous envoyer une demande à ${item.nom} ?`);

  
  }
  const actualiser =() => {
    setUserData([]); // Réinitialiser les données
    setcurrentpage(0);
  }


  const deleteUser = async (item) => {
    try {
      // Récupérer l'ID de l'utilisateur (ou d'autres informations nécessaires) depuis AsyncStorage si nécessaire
      const userids = await AsyncStorage.getItem('key');
  
      // Construire l'URL de l'API pour la suppression
      const url = ApiUrl({ endpoint: `delete_contenu/${item.id}` }); // Remplacez par l'endpoint correct
  
      // Effectuer la requête DELETE
      const response = await axios.delete(url, {
        headers: {
         // 'Authorization': `Bearer ${userids}`, // Ajouter un token si nécessaire
        }
      });
  
      // Traiter la réponse de l'API
      if (response.status === 200) {

        console.log('Utilisateur supprimé avec succès.');
        setUserData([]); // Réinitialiser les données
        setcurrentpage(0);
        //alert('ok')
        // return 'Utilisateur supprimé avec succès.';
      } else {
        console.error('Erreur lors de la suppression de l’utilisateur:', response.data);
       // return 'Erreur lors de la suppression de l’utilisateur.';
      }
    } catch (error) {
      console.error('Erreur lors de la requête de suppression:', error);
      //return 'Erreur lors de la requête de suppression.';
    }
  };
 
  const handleCancel = async () => {
 
    SetmodalVisible(false)
 
  
  
  }

  const handDelete = async (item) => {
 
    setShowSuccessModal(true);
    SetmodalVisible(true)
    Setselected(item)
   Setmessage(`Voulez-vous suprimer   ${item.nom} ?`);
  
  }

  
  const handupdate = async (item) => {
    navigation.navigate('Updatealertscreen', {items:item});
   // alert(item.nom)
  }


 







  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>
   
    <View style={styles.complet}>
     <Websocketscreen/>
     
    


     <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Recherche..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close" size={20} color="#999" style={styles.searchIcon} />
            </TouchableOpacity>
          )}
          {searchText === '' && (
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Addalertscreen', {refresh:fetchUserData})}>
          <Icon name="plus" size={20} style={styles.addButtonIcon} />
        </TouchableOpacity>
        
      </View>


        
        
  

          <Messagebox  message={message} handleConfirm={handleConfirms} handleCancel={handleCancel}  modalVisible={modalVisible}  handleCloseModal={handleCloseModal}  showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}  />
        
              <Localisation/>
             
              </View>  
              <Listeadminalert handupdate={handupdate} handDelete={handDelete} mydata={filteredData}  fetchUserData={fetchUserData}   SetLoading={SetLoading} Loading={Loading}  handleConfirm={handleConfirm}   />
      
            
    </View>
    </>
  );
};

const styles = StyleSheet.create({


  addButtonIcon:{
    color:COLORS.white

  },
 
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex-start', // Align items to the start
    width: '95%', // Set width to accommodate both items
  },

  addButton: {
    backgroundColor: COLORS.rouge,
    borderRadius: 10,
    height: 40, // Match height with TextInput
    width: 40, // Fixed width for the button
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
    marginLeft: 5, // Optional margin for spacing
  },
 




  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blanccasse,
    borderRadius: 8,
    paddingHorizontal: 12,
   // marginBottom: 10,
    flex: 1, // Allow this container to take remaining space
    marginRight: 5, // Add margin to the right to space the button
  },

  complet: {
    backgroundColor: COLORS.blanccasse,
    flex: 1,

  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },

  container: {
    //marginTop: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.grey,
  },
 
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
  },
  item: {
    backgroundColor: COLORS.blue,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: COLORS.red,
  },
  itemText: {
    color: COLORS.beige,
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedItem: {
    backgroundColor: COLORS.red,
  },

  amis: {

    backgroundColor: COLORS.blue,
  },

  selectedAmis: {

    backgroundColor: COLORS.red,
  },

});

export default Listeadminalertscreen;