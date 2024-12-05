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











export default function Inscriptionsceens({ navigation }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setnom] = useState('');
   // const [postnom, setpostnom] = useState('');
    //const [prenom, setprenom] = useState('');
    const [pseudo, setpseudo] = useState('');
    const [phone, setphone] = useState('');
    //const [image, setImage] = useState(null);
    const [urlimage, seturlimage] =  useState(null);
    const [defaultImage, setdefaultImage] =  useState(null);
  









    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
        setPassword('')
        setnom('')
      
        setphone('')

      

      }

  const Actionacc = () => {
    navigation.navigate('MonMenu');

  }




  const uploadImage = async () => {

    const url = ApiUrl({ endpoint: 'create_users' });

    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)
      const formData = new FormData();

      formData.append('nom', nom);
   
      formData.append('password', password);

      formData.append('email', email);
      //formData.append('pseudo', pseudo);
      formData.append('telephone', phone);



      if (nom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le nom')
      }
   
  

      else if (email.trim() === '') {
        setShowSuccessModal(true);
        settext("Veuillez inserer l'email")

      }

      else if (!email.match(/\S+@\S+\.\S+/)) {
        setShowSuccessModal(true);
        settext('Email incorrect')
      }

      else if (password.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le Password')
      }

      else if (phone.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le numéro téléphone')
      }
      else {
        const urlget = ApiUrl({ endpoint: 'verifieremail' });

        const res = await axios.post(urlget, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


        if (res.data === "email") {
          setShowSuccessModal(true);
          settext('cet email existe')
          //Alert.alert("Message", "cet email existe")
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
         

          
        }
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
    <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5"/>
    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
     
      <Image source={require('../assets/Interface App Likunzi copie.png')} style={styles.notificationImage} />

        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold', textAlign:'center' }}>Inscription </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginBottom: 30 , textAlign:'center' }}>Entrer les Details de l'Inscription</Text>
        
        <View style={styles.modalContent}>
       
        <Input icons="user" label="Nom" placeholder="Votre nom" name={nom} setname={setnom}/>


        <Input icons="envelope" label="Email" placeholder="Votre Email" name={email} setname={setemail}/>
        <PasswordInput password={password} setPassword={setPassword} label="Password"/>
        <Input icons="phone" label="Phone" placeholder="Votre Phone" name={phone} setname={setphone}/>

        <Buttons title='Enregistrer'  onPress={uploadImage} Actionconnection={Actionconnection} connexion="Connexion"/>


        
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

    notificationImage: {
        width: 200, // Ajustez la largeur selon vos besoins
        height: 200, // Ajustez la hauteur selon vos besoins
        alignSelf: 'center', // Centre l'image horizontalement
       // marginBottom: 20, // Ajoute un peu d'espace sous l'image
    },

   
})