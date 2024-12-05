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
import { useNavigation } from '@react-navigation/native';











export default function Register({ navigation }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setnom] = useState('');
    const [postnom, setpostnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [pseudo, setpseudo] = useState('');
    const [phone, setphone] = useState('');
    const [image, setImage] = useState(null);
    const [urlimage, seturlimage] =  useState(null);
    const [defaultImage, setdefaultImage] =  useState(null);
  



  useEffect(() => {

   // const userImages = require('../assets/user.png');

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Désolé, nous avons besoin de la permission pour accéder à votre bibliothèque de photos.');
      }
    })();

    setdefaultImage(require('../assets/user.png'))
  

  }, []);


  
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const selectedImage = result.assets[0];
    const imageSize = selectedImage.fileSize;

    if (imageSize > 1000000) { // 1 Mo = 1 000 000 octets
      setShowSuccessModal(true);
      settext('Veuillez choisir une image de moins de  1Mo.')
   
    } else {
      console.log(result); // Vérification du résultat
      setImage(selectedImage);
    }
  }
};










    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
        setPassword('')
        setnom('')
        setpostnom('')
        setprenom('')
        setphone('')

      

      }

  const Actionacc = () => {
    navigation.navigate('MonMenu');

  }




  const uploadImage = async () => {

    const url = ApiUrl({ endpoint: 'create_user' });

    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('postnom', postnom);
      formData.append('prenom', prenom);
      formData.append('password', password);

      formData.append('email', email);
      //formData.append('pseudo', pseudo);
      formData.append('telephone', phone);


      const formdata = new FormData();
      formdata.append('email', email);

      if (nom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le nom')
      }
      else if (postnom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le Post-nom')
      }
      else if (prenom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le Prenom')
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

        const res = await axios.post(urlget, formdata, {
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
          if (!image) {
            const res = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
             annuler()
             setShowSuccessModal(true);
             settext(res.data)
           // Alert.alert("Message", res.data)
            // setImage(null);
          }

          else {

            //const formData = new FormData();
            formData.append('image', {
              uri: image.uri,
              type: 'image/jpeg',
              name: image.fileName,
            });

            const res = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            annuler()
            setShowSuccessModal(true);
            settext(res.data)
            setImage(null);

          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      setShowSuccessModal(true);
      settext('Erreur lors du téléchargement de l\'image')
      //Alert.alert();
      // Alert.alert(res.data)
    }
  }, 3000);
  };

  const navigations = useNavigation();

    const Actionconnection = () => {
       // navigation.navigate('Ts');
      
       navigations.goBack();
          



      };


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#c80000"/>

    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
     


        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold', textAlign:'center' }}>Inscription </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginBottom: 50 , textAlign:'center' }}>Entrer les Details de l'Inscription</Text>
        <View style={styles.modalContent}>
        <Imagephoto  defaultImage={defaultImage} setdefaultImage={setdefaultImage} pickImage={pickImage} image={image} urlimage={urlimage}/>
        <Input icons="user" label="Nom" placeholder="Votre nom" name={nom} setname={setnom}/>
        <Input icons="user" label="Post-Nom" placeholder="Votre Post-nom" name={postnom} setname={setpostnom}/>
        <Input icons="user" label="Prenom" placeholder="Votre Prenom" name={prenom} setname={setprenom}/>
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

   
})