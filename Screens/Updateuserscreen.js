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











export default function Updateuserscreen({ navigation, route }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setnom] = useState('');
   // const [postnom, setpostnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [pseudo, setpseudo] = useState('');
    const [phone, setphone] = useState('');
    const [userid, setuserid] = useState();
    const [urlimage, seturlimage] =  useState(null);
    const [defaultImage, setdefaultImage] =  useState(null);
    const {items}=route.params;
  



  useEffect(() => {
    const item = items
    setuserid(items.id.toString())
    setnom(items.nom)
    setprenom(items.prenom)
    setemail(items.email)
    setphone(items.telephone)


  }, []);








    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
        setPassword('')
        setnom('')
        setprenom('')
        setphone('')

      

      }

  const Actionacc = () => {
    navigation.navigate('MonMenu');

  }




  const adduser = async () => {

    const url = ApiUrl({ endpoint: `update_admin/${userid}` });

    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)
      const formData = new FormData();

      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('password', password);

      formData.append('email', email);
      //formData.append('pseudo', pseudo);
      formData.append('telephone', phone);



      if (nom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le nom')
      }
   
      if (prenom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le prénom')
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

       


       
        
        
       
        

            //const formData = new FormData();
            

            const res = await axios.put(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            annuler()
            setShowSuccessModal(true);
            settext(res.data)
           // refresh()
            //const navigations = useNavigation();
           // navigation.goBack();
           navigation.navigate('Listeusercreen');
         

          
        
      }
    } catch (error) {
      console.error('update echouée:', error);
      setShowSuccessModal(true);
      settext('update echouée')
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
       
        <Input icons="user" label="Nom" placeholder="Votre nom" name={nom} setname={setnom}/>
        <Input icons="user" label="Prénom" placeholder="Votre prénom" name={prenom} setname={setprenom}/>


        <Input icons="envelope" label="Email" placeholder="Votre email" name={email} setname={setemail}/>
        <PasswordInput password={password} setPassword={setPassword} label="Password"/>
        <Input icons="phone" label="Phone" placeholder="Votre phone" name={phone} setname={setphone}/>

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