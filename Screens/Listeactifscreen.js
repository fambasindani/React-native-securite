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
import { StatusBar } from 'expo-status-bar';
import Listeactif from '../Composant/Listeactif';




const Listeactifscreen = ({ navigation }) => {
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
  
 
  const fetchlocalisation = async () => {

    const userids = await AsyncStorage.getItem('key');
    //Setverification(true)
         // Alert.alert(userids)      
    Setmonid(userids)
  }
 

  const fetchUserData = async () => {
   // if (Loading) return; // Éviter les requêtes multiples
   var userids = await AsyncStorage.getItem('key');

   const nextpage=currentpage+1;

    SetLoading(true);
    try {
   

      const urls = ApiUrl({ endpoint: `getall` });
   // getuserpage/1?page=1&per_page=100
      const url = `${urls}?page=${nextpage}&per_page=10`;
      const response = await axios.get(url);
      const newData = response.data.data;
      console.log(newData)
   
        setcurrentpage(nextpage);
        setUserData((prevData) => prevData.concat(newData));
        SetLoading(false);
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
    const nom = item.nom ? item.nom.toLowerCase() : ''; // Vérifie si nom existe
    const prenom = item.prenom ? item.prenom.toLowerCase() : ''; // Vérifie si prenom existe
  
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
  await createmessage(item) 
 /// Alert.alert(item.nom)
  }

 
  const handleConfirm = async (item) => {
    //setcouleurdemande(true)
    setShowSuccessModal(true);
    SetmodalVisible(true)
   Setselected(item)
   Setmessage(`Voulez-vous envoyer une demande à ${item.nom} ?`);

  
  }
 
  const handleCancel = async () => {
 
    SetmodalVisible(false)
 
  
  
  }


  const createmessage = async (item) => {
    setcouleurdemande(true)

  

    try {
      const url = ApiUrl({ endpoint: 'createdemande' });
    
      const id = await AsyncStorage.getItem('key');
     // Alert.alert('Message',id)
      const formData = new FormData();
      formData.append('recev_id', item.id);
      formData.append('envoi_id', id);
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     


      setverficationami(true)
      console.log(res.data+"  "+item.nom);

      
      //  await fetchUserData();
       // setcurrentpage(nextpage);
        navigation.replace('Listeamiscreen');
      
      
     
    } catch (error) {
      console.error(error);
    }
  };

 

  const Activation = async (item) => {
    const url = ApiUrl({ endpoint: 'activer' });
    const formData = new FormData();
  
    // Ajout du contenu au FormData
    formData.append('id', item.id);
    formData.append('role', item.role);
  
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     // alert('ok')
  
      // Redirection après la réussite de l'insertion
      navigation.replace('Listeactifscreen');
    } catch (error) {
      console.error('Insertion échouée:', error);
      
      // Optionnel : afficher une alerte en cas d'erreur
      //Alert.alert('Erreur', 'L\'insertion a échoué, veuillez réessayer.');
    }
  };



 







  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>
    <View style={styles.complet}>
     <Websocketscreen/>
     
    


      <View style={styles.container}>


       
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

      </View>

        
          <Listeactif  Activation={Activation} mydata={filteredData}  fetchUserData={fetchUserData}   SetLoading={SetLoading} Loading={Loading}  handleConfirm={handleConfirm}   />
      

  

          <Messagebox  message={message} handleConfirm={handleConfirms} handleCancel={handleCancel}  modalVisible={modalVisible}  handleCloseModal={handleCloseModal}  showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}  />
        
              <Localisation/>
              
           
         

    </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start', // Alignement du contenu à gauche
    // marginBottom: 16,

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    backgroundColor: COLORS.blanccasse,
    marginBottom: 10,
    width: '95%',
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

export default Listeactifscreen;