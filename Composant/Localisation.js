import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiUrl from './ApiUrl';

const Localisation = ({ iduser }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({ latitudeDelta: 0, longitudeDelta: 0 });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const id = await AsyncStorage.getItem('key');
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        
        // Définir une distance en km pour le calcul
        const distanceInKm = 10; // Par exemple, 10 km
        const latitudeDelta = distanceInKm / 111.32; // Calcul des deltas
        const longitudeDelta = distanceInKm / (111.32 * Math.cos(location.coords.latitude * (Math.PI / 180)));

        // Mettre à jour la région avec les deltas calculés
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        });

        // Appeler updateLocation avec les deltas
        updateLocation(location.coords.latitude, location.coords.longitude, id, latitudeDelta, longitudeDelta);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(getLocation, 5000); // Mettre à jour toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  const updateLocation = async (latitude, longitude, id, latitudeDelta, longitudeDelta) => {
    try {
      let lat=latitude
      const formData = new FormData();
      formData.append('iduser', id);
      formData.append('latitude', lat);
      formData.append('longitude', longitude);
      formData.append('latitudeDelta', latitudeDelta);
      formData.append('longitudeDelta', longitudeDelta);

      const url = ApiUrl({ endpoint: 'createpublication' });
//alert(lat.toString())
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Affichage des données de la réponse
     // console.log('Response:', res.data);
      //console.log('User ID:', id);
     // console.log('Latitude:', latitude);
     // console.log('Longitude:', longitude);
     // console.log('Latitude Delta:', latitudeDelta);
     // console.log('Longitude Delta:', longitudeDelta);
      
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <View>
      <Text></Text>
      
    </View>
  );
};

export default Localisation;