import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      <Text style={styles.headerTitle}>Admin</Text>
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
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        if (name !== null) {
          setUserName(name);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
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
  );
};

const Menuadmincreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handlePress = async (contenu) => {
    setModalVisible(false);
    const url = ApiUrl({ endpoint: 'createnotification' });
    const id = await AsyncStorage.getItem('monid');

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('envoi_id', id);
      formData.append('contenus', contenu);

      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowSuccessModal(true);
      setText('Opération effectuée');
    } catch (error) {
      console.error('Erreur:', error);
      setShowSuccessModal(true);
      setText('Erreur');
    } finally {
      setLoading(false);
    }
  };

  const Users = () => {
    navigation.navigate('Listeactifscreen');
  };

  const Maps = () => {
    navigation.navigate('Listeadminlocalisationscreens');
  };

  const Securite = () => {
    navigation.navigate('Listeusercreen');
  };

  const Alert = () => {
    navigation.navigate('MaListeadminalertscreen');
  };

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>
    <View style={styles.container}>
      <Header />
      <UserSection />

      <View style={styles.row}>
        <MenuItem 
          iconName="users" // Icône pour Users
          label="Users" 
          onPress={Users} 
        />
        <MenuItem 
          iconName="map" // Icône pour Maps
          label="Maps" 
          onPress={Maps} 
        />
      </View>
      <View style={styles.row}>
        <MenuItem 
          iconName="shield" // Icône pour Sécurité
          label="Sécurité" 
          onPress={Securite} 
        />
        <MenuItem 
          iconName="exclamation-circle" // Icône pour Alerts
          label="Alerts" 
          onPress={Alert}  
        />
      </View>

      <Websocketscreen />
      <Loading visible={loading} />
      <Message 
        handleCloseModal={handleCloseModal} 
        text={text} 
        showSuccessModal={showSuccessModal} 
        setShowSuccessModal={setShowSuccessModal} 
      />
      <Modalalert handlePress={handlePress} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
    </>
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
    fontWeight: 'bold',
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

export default Menuadmincreen;