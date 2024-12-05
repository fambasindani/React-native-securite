import { View, Image, Text, StyleSheet, Alert, SafeAreaView ,ScrollView, StatusBar, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../Couleurs/COLORS'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import Imagephoto from '../Composant/Imagephoto'
import Input from '../Composant/Inputtext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PasswordInput from '../Composant/Password';
import Buttons from '../Composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../Composant/ApiUrl';
import Boutons from '../Composant/Boutons';











export default function Passwordscreen({ navigation }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState('');
 
 
 
  









    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
     
   

      

      }

  const Actionacc = () => {
    navigation.navigate('MonMenu');

  }




  const uploadImage = async () => {

    const url = ApiUrl({ endpoint: 'send_email' });

    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)
      const formData = new FormData();
  
    

      formData.append('email', email);
   


   

  
    
    

      if (email.trim() === '') {
        setShowSuccessModal(true);
        settext("Veuillez inserer l'email")

      }

      else if (!email.match(/\S+@\S+\.\S+/)) {
        setShowSuccessModal(true);
        settext('Email incorrect')
      }

        else {
       
            const res = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
         
          
          annuler()
          setShowSuccessModal(true);
          settext(res.data)
          // navigation.navigate('MonMenu');


         
            
      }
    } catch (error) {
      console.error('Erreur:', error);
      setShowSuccessModal(true);
      settext('Erreur')
      //Alert.alert();
      // Alert.alert(res.data)
    }
  }, 5000);
  };

  
  const Actionconnection = () => {

    navigation.navigate('Loginscreen');
  }


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5"/>

    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
     


        <Text style={{ color: COLORS.black, fontSize: 25, fontWeight: 'bold', textAlign:'center' }}>Password oublié </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginBottom: 50 , textAlign:'center' }}>Entrer les Details de Password</Text>
        <View style={styles.modalContent}>
       
      
       
        <Input icons="envelope" label="Email" placeholder="Votre Email" name={email} setname={setemail}/>
       
        <Buttons title='Envoyer' Actionconnection={Actionconnection}  onPress={uploadImage} connexion="Connexion"/>


        
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
   
      paddingTop:80,
   
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