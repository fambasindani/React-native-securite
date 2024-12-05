import { View, Image, Text, StyleSheet, Alert, SafeAreaView ,ScrollView, StatusBar, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../Couleurs/COLORS'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import Imagephoto from '../Composant/Imagephoto'
import Input from '../Composant/Inputtext';

import PasswordInput from '../Composant/Password';
import Buttons from '../Composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../Composant/ApiUrl';
import { useNavigation } from '@react-navigation/native';











export default function Addalertscreen({ navigation, route }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const [contenu, setcontenu] = useState('');

  
  
  









    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setcontenu('')
    

      

      }






  const adduser = async () => {

    const url = ApiUrl({ endpoint: 'create_contenu' });

    setloading(true)
    setTimeout(async () => {
    try {
    
      setloading(false)
      const formData = new FormData();

      formData.append('contenu', contenu);
     



      if (contenu.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir les contenus')
      }
   
     

     

    

     

     
      else {
       

       

        
        
       
        

            //const formData = new FormData();
            

            const res = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            annuler()
            setShowSuccessModal(true);
            settext(res.data)
           // refresh()
            //const navigations = useNavigation();
            //navigations.goBack();
           navigations.navigate('MaListeadminalertscreen');
         

          
        }
      
    } catch (error) {
      console.error('insersion echouée:', error);
      setShowSuccessModal(true);
      settext('insersion echouée')
      //Alert.alert();
      // Alert.alert(res.data)
    }
  }, 3000);
  };

  const navigations = useNavigation();

    const Actionconnection = () => {
        navigation.navigate('Loginscreen');
      
      // navigations.goBack();
          



      };


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>

    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
     
     
        <View style={styles.modalContent}>
       
        <Input icons="pencil" label="Contenu" placeholder="Votre contenu" name={contenu} setname={setcontenu}/>
      
        <Buttons title='Enregistrer'  onPress={adduser} Actionconnection={Actionconnection} />


        
        </View>
      </ScrollView>
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
   
      //paddingTop:80,
   
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

    notificationImage: {
        width: 200, // Ajustez la largeur selon vos besoins
        height: 200, // Ajustez la hauteur selon vos besoins
        alignSelf: 'center', // Centre l'image horizontalement
       // marginBottom: 20, // Ajoute un peu d'espace sous l'image
    },

   
})