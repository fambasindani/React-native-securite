
import { View, Image, Text, StyleSheet, Alert, SafeAreaView ,ScrollView, StatusBar, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../Couleurs/COLORS'

import axios from 'axios'

import Input from '../Composant/Inputtext';

import PasswordInput from '../Composant/Password';
import Buttons from '../Composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../Composant/ApiUrl';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Websocketscreen from './Websocketscreen';


export default function EditProfil({ navigation }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setnom] = useState('');
    const [postnom, setpostnom] = useState('');
    const [prenom, setprenom] = useState('');
 
    const [phone, setphone] = useState('');
    //const [image, setImage] = useState(null);
  
    const route = useRoute();
  // Récupération des données



    useEffect(() => {
        //const { userData } = route.params; 
        const { userData } = route.params || {}; 
       // alert(userData.data[0].nom)
       //console.log(userData)
       setloading(true);
       try {
       setnom(userData.nom)
       setpostnom(userData.postnom)
       setprenom(userData.prenom)
       setemail(userData.email)
       setphone(userData.telephone)
      // console.log(userData.nom)
    } catch (error) {
        console.error('Erreur:', error.message);
        return null; // Ou gérez l'erreur selon vos besoins
      } finally {
        setloading(false); // Arrêter le chargement dans tous les cas
      }

     
      }, []); // Le tab






    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
        setPassword('')
        setnom('')
      
        setphone('')

      

      }





  const updateuser = async () => {

    const url = ApiUrl({ endpoint: 'update_users' });
       
    const id = await AsyncStorage.getItem('monid'); // Récupérer le nom
    //alert(id)
    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)

     
            const formData = new FormData();

            // Ajoutez les champs au FormData
            formData.append('nom', nom);
            formData.append('postnom', postnom);
            formData.append('prenom', prenom);
            formData.append('telephone', phone);



      if (nom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le nom')
      }
   
      else if (postnom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le post-nom')
      }

     
      else if (prenom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le prénom')
      }
      

  

      else if (phone.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le numéro téléphone')
      }
    
       
        
        else {
       
        

            //const formData = new FormData();
            

            const res = await axios.put(`${url}/${id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

           // annuler()
            setShowSuccessModal(true);
            settext(res.data)
            navigation.navigate('Loginscreen');
         

          
        
      }
    } catch (error) {
      console.error('modification echouée:', error);
      setShowSuccessModal(true);
      settext('modification echouée')
      //Alert.alert();
      // Alert.alert(res.data)
    }
  }, 3000);
  };

  const navigations = useNavigation();

   


  return (


    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>
    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
     
     
        <View style={styles.modalContent}>
       
        <Input icons="user" label="Nom" placeholder="Votre Nom" name={nom} setname={setnom}/>
         <Input icons="user" label="Post-Nom" placeholder="Votre Post-Nom" name={postnom} setname={setpostnom}/>
         <Input icons="user" label="Prénom" placeholder="Votre Prénom" name={prenom} setname={setprenom}/>
       
        <Input icons="phone" label="Phone" placeholder="Votre Phone" name={phone} setname={setphone}/>

        <Buttons title='Enregistrer'  onPress={updateuser}/>


        
        </View>
      </ScrollView>
      <Websocketscreen/>
    </View>
    </>
  )
}



const styles = StyleSheet.create({

  modalContent: {
    
     flex: 1,
     justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: COLORS.blanccasse,
   // padding: 20,
     
    
  },

    container: {
   
    paddingTop:20,
   
     alignItems: 'center',
     width:'100%',
     height:'100%',
    // backgroundColor:'white'
  
    },
    scrollview: {
    width:'100%'
     // paddingTop:80,

    // alignItems: 'center',
   
    },



    contairebuttona:{
     marginTop:20,
        backgroundColor: COLORS.grey,
         marginBottom: 10,

    },

    contairebuttonen:{
        marginTop:20,
        backgroundColor: COLORS.vert,
        // marginLeft: '30%',

    },

   
   
})