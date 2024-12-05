import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importer FontAwesome
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modalalert from '../Composant/Modalalert';
import Loading from '../Message/Loading';
import Message from '../Message/Boxmessage';
import ApiUrl from '../Composant/ApiUrl';
import axios from 'axios';
import Websocketscreen from './Websocketscreen';
import { StatusBar } from 'expo-status-bar';

const Header = () => {

   
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Menu</Text>
    </View>
  );
};

const MenuItem = ({ iconName, label, onPress }) => {


   
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <FontAwesome name={iconName} size={40} color="#fff" />
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const UserSection = () => {
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();
    
    const deconnecter = () => {
      navigation.navigate('Loginscreen');
     // navigations.goBack();
    }
    

     // Récupérer le nom de l'utilisateur lors du chargement du composant
     useEffect(() => {
       const fetchUserName = async () => {
         try {
           const name = await AsyncStorage.getItem('name'); // Récupérer le nom
        
          // alert(monid)
           if (name !== null) {
             setUserName(name); // Mettre à jour l'état local avec le nom
           }
         } catch (error) {
           console.error('Erreur lors de la récupération du nom:', error);
         }
       };
   
       fetchUserName();
     }, []); // Le tableau vide [] permet d'exécuter useEffect une seule fois
   
   
   



  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>

    <View style={styles.userSection}>
      <View style={styles.userInfo}>
        <FontAwesome name="user" size={30} color="#007BFF" />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={deconnecter}>
        <Text style={styles.logoutText}>Déconnecter</Text>
        <FontAwesome name="sign-out" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
    </>
  );
};

const Menuscreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
   
    
    const handlePres = (contenu) => {
     // setModalVisible(true)
      alert(contenu)
    };

    const showmodal = () => {
      setModalVisible(true)
      //alert(contenu)
    };

    const handleCloseModal = () => {
      setShowSuccessModal(false);
  };
    
    const handlePress = async (contenu) => {
      setModalVisible(false)
      //const t="fffff"
      const url = ApiUrl({ endpoint: 'createnotification' });
      const id = await AsyncStorage.getItem('monid');

      setLoading(true);

      try {
       // alert(id)
          const formData = new FormData();
          formData.append('envoi_id', id);
          formData.append('contenus', contenu);

         
         

          const res = await axios.post(url, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          setShowSuccessModal(true);
          setText('operation effectuée');
          //setText(contenu);  
        
      } catch (error) {
          console.error('Erreur:', error);
          setShowSuccessModal(true);
          setText('Erreur');
      } finally {
          setLoading(false);
      }
  };
  


    const Profil = () => {
        navigation.navigate('Profil');
       // navigations.goBack();
      }
       const Amis = () => {
        navigation.navigate('Listeamiscreen');
       // navigations.goBack();  
     
      }

    
      const Notifacation = () => {
        navigation.navigate('Listenotificationscreen');
       // navigations.goBack();     
     
      } 

      const Alert = () => {
        navigation.navigate('Listealertscreen');
       // navigations.goBack();     
     
      } 
        
        
    
  return (
    <View style={styles.container}>
      <Header />
      <UserSection />
      
      <View style={styles.row}>
        <MenuItem 
          iconName="user" // Icône pour Profil
          label="Profil" 
          onPress={Profil} 
        />
        <MenuItem 
          iconName="user-plus" // Icône pour Amis
          label="Invitation" 
          onPress={Amis} 
        />
      </View>
      <View style={styles.row}>
        <MenuItem 
          iconName="bell" // Icône pour Notifications
          label="Notifications" 
          onPress={Notifacation} 
        />
        <MenuItem 
          iconName="check-circle" // Icône pour Alerts
          label="Alerts" 
          onPress={Alert}  
        />
      </View>
      <View style={styles.row}>
        <MenuItem 
          iconName="info-circle" // Icône pour Détails
          label="A propos" 
          onPress={() => alert('Détails Pressé!')} 
        />
        <MenuItem 
          iconName="paper-plane" // Icône pour Envoi d'alerte
          label="Envoyer Alert" 
          onPress={showmodal}  
           
        />
      </View>
      <Websocketscreen/>
      <Loading visible={loading} />
      <Message 
                handleCloseModal={handleCloseModal} 
                text={text} 
                showSuccessModal={showSuccessModal} 
                setShowSuccessModal={setShowSuccessModal} 
            />
      <Modalalert handlePress={handlePress} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c80000',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight:'bold',

    
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    color: '#007BFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 8,
    width: 150,
    height: 100,
  },
  menuLabel: {
    marginTop: 5,
    fontSize: 16,
    color: '#fff',
  },
});

export default Menuscreen;