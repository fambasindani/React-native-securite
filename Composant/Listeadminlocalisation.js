import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Liste';
import ModalPopup from './ModalPopup';
import ApiUrl from './ApiUrl';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import ApiUrlbis from './ApiUrlbis';
import { useNavigation } from '@react-navigation/native';
import Cartemaps from './Cartemaps';
import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française
import Message from '../Message/Boxmessage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Listeadminlocalisation = ({ mydata, SetLoading, Loading, fetchUserData, handleConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setphone] = useState(null);
  const [email, setemail] = useState(null);
  const [nom, setnom] = useState(null);
  const [prenom, setprenom] = useState(null);
  const [modalVisiblemap, setModalVisiblemap] = useState(false);
  const [text, setText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [latitudeDelta, setlatitudeDelta] = useState('');
  const [longitudeDelta, setlongitudeDelta] = useState('');
  const [Nom, setNom] = useState('');


  const urlBIS = ApiUrlbis({ endpoint: 'static/Image/' });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
};
  const timeAgo = (timestamp) => {
    return moment(timestamp).fromNow(); // Utilisation de Moment pour obtenir le temps écoulé
  };

  const renderItem = ({ item, index }) => {


    const Actionmaps = async(item) => {
      const monid = await AsyncStorage.getItem('monid'); // Récupérer le nom
      const url = ApiUrl({ endpoint: 'getlocalisationadmin' });
     // 
     

     
       //Alert.alert("recuperer id_recev", item.recev_id.toString())
       try {
        // Alert.alert("recuperer id_envoi",item.envoi_id.toString())
        //const response = await axios.get(urlconfirmation/${item.id});
        const response = await axios.get(`${url}/${item.id}`);
       // alert(item.latitude.toString())
        setlatitude(response.data[0].latitude)
        setlongitude(response.data[0].longitude)
        setlatitudeDelta(response.data[0].latitudeDelta)
        setlongitudeDelta(response.data[0].longitudeDelta)
        setNom(response.data[0].nom)
        setModalVisiblemap(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
       
      }

      
    
    };

 


    const handdetails = (item) => {
      setShowSuccessModal(true);
      setText(item.contenu);
     //alert(item.contenu) <Text style={styles.date}>{timeAgo(item.datenotification) ?timeAgo(item.datenotification)  : 'N/A'}</Text>
    };

    return (
      
      <View style={styles.itemContainer}>
      
        <TouchableOpacity style={styles.indexContainer}>
          <Image source={{ uri: urlBIS + item.url }} style={[styles.image, { width: 90, height: 90 }]} />
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameDateContainer}>
            <Text style={styles.description}>{item.prenom}</Text>
           
          </View>
          <Text style={styles.price}>{item.nom}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonRow]}onPress={() => Actionmaps(item)}>
              <FontAwesome5 name="map-marker-alt" size={18} color={COLORS.white} />
              <Text style={styles.buttonText}>Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton, styles.buttonRow]} onPress={() => handdetails(item)}>
              <FontAwesome5 name="info-circle" size={18} color={COLORS.white} />
              <Text style={[styles.buttonText, styles.deleteButtonText]}>Détails</Text>
            </TouchableOpacity>
          </View>
        </View>
    
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Listflast
        SetLoading={SetLoading}
        Loading={Loading}
        data={mydata}
        fetchUserData={fetchUserData}
        renderItem={({ item, index }) => renderItem({ item, index: index + 1 })}
      />
      <ModalPopup nom={nom} prenom={prenom} phone={phone} email={email} modalVisible={modalVisible} setModalVisible={setModalVisible} toggleModal={toggleModal} />
      <Cartemaps latitudes={latitude} longitude={longitude} nom={Nom} latitudeDelta={latitudeDelta} longitudeDelta={longitudeDelta} modalVisible={modalVisiblemap} setModalVisible={setModalVisiblemap} />
      <Message 
                handleCloseModal={handleCloseModal} 
                text={text} 
                showSuccessModal={showSuccessModal} 
                setShowSuccessModal={setShowSuccessModal} 
            />
    </View>
  );
};

const styles = {
  container: {
   // flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
 
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    resizeMode: 'cover',
   // aspectRatio: 16 / 9,
    aspectRatio: 1,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 16,
  },
  nameDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4, // Ajout d'un espacement entre le nom/date et le prix
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 11,
    color: COLORS.grey,
    marginLeft: 8, // Ajout d'un espacement à gauche pour la date
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  deleteButtonText: {
    color: COLORS.white,
  },
  price: {
    color: COLORS.grey,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Listeadminlocalisation;