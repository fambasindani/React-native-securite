import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screens/Inscriptionscreen';
import Loginscreen from './Screens/Loginscreen';
import Menuscreen from './Screens/Menuscreen';
import Profil from './Screens/Profilscreens';
import Menuaccept from './Composant/Menuaccept';
import Malistesocket from './Composant/Malistesocket';
import Listeamis from './Composant/Listeamis';
import Listeami from './Composant/Pagination';
import Inscriptionsceens from './Screens/Inscriptionsceens';
import Ts from './Composant/Ts';
import MonMenu from './Composant/Monmenu';
import Passwordscreen from './Screens/Passwordscreen';
import Carte from './Composant/Carte';
import COLORS from './Couleurs/COLORS';
import EditProfil from './Screens/EditProfilscreen';
import Listeamiscreen from './Screens/Listeamiscreen';
import Listealerte from './Composant/Listealerte';
import Listenotification from './Composant/Listenotification';
import Listenotificationscreen from './Screens/Listenotificationscreen';
import Listealertscreen from './Screens/Listealertscreen';
import SocketComponent from './Composant/SocketComponent ';
import NotificationScreenss from './Composant/Socket';
import Websocketscreen from './Screens/Websocketscreen';
import Modalalert from './Composant/Modalalert';
import Menuadmincreen from './Screens/Menuadmincreen';
import Listeusercreen from './Screens/Listeusercreen';
import Adduserscreen from './Screens/Adduserscreen';
import Updateuserscreen from './Screens/Updateuserscreen';
import Listeadminalertcreen from './Screens/Listeadminlocalisationscreen';
import Addalertscreen from './Screens/Addalertscreen';
import Updatealertscreen from './Screens/Updatealertscreen';
import Listeadminalertscreen from './Screens/Listeadminalertscreen';

import Listeadminlocalisationscreens from './Screens/Listeadminlocalisationscreen';
import MaCartes from './Composant/Macartes';
import Listeactifscreen from './Screens/Listeactifscreen';




const Stack = createNativeStackNavigator();

const App = () => {
  return (
   
  
    <NavigationContainer>
      <Stack.Navigator>

    

      <Stack.Screen
          name='Inscriptionsceens'
          component={Inscriptionsceens}
          options={{ headerShown: false }} // Utilisez options pour désactiver l'en-tête
        />
      <Stack.Screen
          name='Menuadmincreen'
          component={Menuadmincreen}
          options={{ headerShown: false }} //            Utilisez options pour désactiver l'en-tête
        />

        
<Stack.Screen
          name="Listeusercreen"
          component={Listeusercreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Liste Admin', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte   Listeactifscreen
            },
          }}
        />


<Stack.Screen
          name="Listeactifscreen"
          component={Listeactifscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Liste Utilisateurs', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte   
            },
          }}
        />
        

        
<Stack.Screen
          name="Updateuserscreen"
          component={Updateuserscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Modifier Admin', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />



<Stack.Screen
          name="Addalertscreen"
          component={Addalertscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Ajouter Alerte', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />



<Stack.Screen
          name="Updatealertscreen"
          component={Updatealertscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Modifier Alerte', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />



<Stack.Screen
          name="Adduserscreen"
          component={Adduserscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Ajouter Admin', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />





<Stack.Screen
          name="Listeadminlocalisationscreens"
          component={Listeadminlocalisationscreens}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Liste Géolocalisation', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />





     
<Stack.Screen
          name="MaListeadminalertscreen"
          component={Listeadminalertscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Listeadminalertscreen
            },
            headerTitle: 'Liste Alertes', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />





     


      

        <Stack.Screen
          name='Websocketscreen'
          component={Websocketscreen}
         options={{ headerShown: false }} // Utilisez options pour désactiver l'en-tête
        />


        <Stack.Screen
          name='Menuscreen'
          component={Menuscreen}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Menuscreen
        />

        <Stack.Screen
          name='Loginscreen'
          component={Loginscreen}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Loginscreen
        />

        <Stack.Screen
          name='Menuaccept'
          component={Menuaccept}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Menuaccept
        />

        <Stack.Screen
          name='Malistesocket'
          component={Malistesocket}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Malistesocket
        />



        <Stack.Screen
          name="Listeamiscreen"
          component={Listeamiscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Invitations', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />



        <Stack.Screen
          name="Listenotificationscreen"
          component={Listenotificationscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Notifications', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />

        <Stack.Screen
          name="Listealertscreen"
          component={Listealertscreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Alerts', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />



        <Stack.Screen
          name="EditProfil"
          component={EditProfil}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Edit Profil', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />

        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{
            headerStyle: {
              backgroundColor: COLORS.rouge,
              color: COLORS.white // Couleur de fond de l'en-tête
            },
            headerTitle: 'Profil', // Titre de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
            headerTitleStyle: {
              fontSize: 25, // Taille de police
              fontWeight: 'bold', // Texte en gras
              color: COLORS.white, // Couleur du texte
            },
          }}
        />

        <Stack.Screen
          name='Register'
          component={Register}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Register
        />

        <Stack.Screen
          name='Ts'
          component={Ts}
        />



        <Stack.Screen
          name='Passwordscreen'
          component={Passwordscreen}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Passwordscreen
        />

        <Stack.Screen
          name='Carte'
          component={Carte}
          options={{ headerShown: false }} // Désactiver l'en-tête pour Carte
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
};

export default App;