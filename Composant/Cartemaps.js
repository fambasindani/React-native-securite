import React, { useState, useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Modal, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmFtYmExOTg1IiwiYSI6ImNtNDFiNTlnazA5aDAyanIybHM1MmZhdmkifQ.fvPeL-KFlMCVgx08fa1t2w'; // Votre clé d'accès API

const Cartemaps = ({ modalVisible, setModalVisible, latitudes, nom, longitude, latitudeDelta, longitudeDelta }) => {
  const [region, setRegion] = useState({
    latitude: latitudes || -4.35178,
    longitude: longitude || 15.2102,
    latitudeDelta: latitudeDelta || 0.0922,
    longitudeDelta: longitudeDelta || 0.0421,
  });

  useEffect(() => {
    if (modalVisible) {
      setRegion({
        latitude: latitudes || -4.35178,
        longitude: longitude || 15.2102,
        latitudeDelta: latitudeDelta || 0.0922,
        longitudeDelta: longitudeDelta || 0.0421,
      });
    }
  }, [modalVisible, latitudes, longitude, latitudeDelta, longitudeDelta]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Accès à la localisation',
            message: "Cette application a besoin d'accéder à votre localisation.",
            buttonNeutral: 'Me le demander plus tard',
            buttonNegative: 'Refuser',
            buttonPositive: 'Accepter',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Autorisation accordée');
        } else {
          console.log('Autorisation refusée');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Autorisation refusée');
        return;
      }
    }
  };

  useEffect(() => {
    if (modalVisible) {
      requestLocationPermission();
    }
  }, [modalVisible]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Mapbox</title>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
        <style>
          body { margin: 0; padding: 0; }
          #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
        <script>
          mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // Style de la carte
            center: [${longitude}, ${latitudes}], // Longitude, Latitude
            zoom: 12
          });

          new mapboxgl.Marker()
            .setLngLat([${longitude}, ${latitudes}])
            .setPopup(new mapboxgl.Popup().setText('${nom}')) // Ajoute un popup
            .addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#c80000" />
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <View style={styles.modalContainer}>
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={styles.map}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Cartemaps;