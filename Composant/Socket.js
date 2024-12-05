import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';

import { StyleSheet } from 'react-native';

const NotificationScreenss = ({navigation}) => {
  const [socketConnection, setSocketConnection] = useState(null);
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    // Créer une instance de socket.io-client
    const socket = io('http://192.168.87.147:1200', {
      transports: ['websocket'],
    });

    // Gérer la connexion
    socket.on('connect', () => {
      console.log('Connected to server');
      setSocketConnection(socket);
    });

    // Gérer la réception des données
    socket.on('v', (data) => {
      console.log('Received data:', data);
      setReceivedData(data.data);
      sendNotification(data.data);
      const userName = 'famba';
      //Alert.alert("Notification", `${data.data[0].nom} est en danger`);
      navigation.navigate('Listealertscreen');
    //  Alert.alert("Notification", data.nom);
      console.log(data.data[0].nom)
    });

    // Gérer les erreurs
    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    // Nettoyer la connexion WebSocket lors du démontage du composant
    return () => {
      socket.disconnect();
    };
  }, []);

  // Envoyer une notification
  const sendNotification = async (data) => {
    // Récupérer l'ID de l'utilisateur connecté
    const currentUserId = 16; // Remplacez par la vraie valeur de l'ID de l'utilisateur connecté
  
    // Parcourir les données reçues
    for (const user of data) {
      // Vérifier si l'ID de l'utilisateur est différent de l'ID de l'utilisateur connecté
    
    
      // if (user.id === currentUserId) {
        // Envoyer la notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Notification',
            body: `famba est en danger`,
            android: {
              channelId: 'channel-id',
              sound: true,
              color: '#FF0000',
              icon: 'adaptive-icon'
            }
          },
          trigger: { seconds: 1 }
        });
     // }
    }
    
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification clicked"); // Vérifiez si ce message s'affiche dans la console
      actionAller();
    });
  
    return () => subscription.remove();
  }, []);

  const actionAller = () => {
    navigation.navigate('Listealertscreen'); // Naviguer vers le composant ListeUser
  //  Alert.alert("Message", "je suis la")
  };
  

  // Envoyer des données au serveur
  const sendMessage = () => {
    if (socketConnection) {
      socketConnection.emit('message', { data: 'Hello, server!' });
     // Alert.alert('ok')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebSocket Component</Text>
      <Button title="Send Message" onPress={sendMessage} style={styles.button} />
      {receivedData && <Text style={styles.receivedData}>Received data: {JSON.stringify(receivedData)}</Text>}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  receivedData: {
    marginTop: 20,
  },
});

export default NotificationScreenss;