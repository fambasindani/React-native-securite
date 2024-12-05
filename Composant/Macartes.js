import React, { useState, useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_OSM } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

const Cartemapss = ({ modalVisible, setModalVisible, latitudes, nom, longitude, latitudeDelta, longitudeDelta }) => {
  const [region, setRegion] = useState({
    latitude: latitudes || -4.35178,
    longitude: longitude || 15.2102,
    latitudeDelta: latitudeDelta || 0.0922,
    longitudeDelta: longitudeDelta || 0.0421,
  });

  useEffect(() => {
    if (modalVisible) {
      console.log('Modal est visible, mise à jour de la région...');
      console.log('Latitudes:', latitudes);
      console.log('Longitudes:', longitude);

      if (latitudes && longitude) {
        const newRegion = {
          latitude: latitudes,
          longitude: longitude,
          latitudeDelta: latitudeDelta || 0.0922,
          longitudeDelta: longitudeDelta || 0.0421,
        };
        setRegion(newRegion);
        console.log('Nouvelle région:', newRegion); // Afficher la nouvelle région
      } else {
        console.warn('Latitudes ou Longitudes invalides');
      }
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
          Alert.alert(
            'Permission refusée',
            "L'application a besoin d'accéder à votre localisation pour fonctionner correctement.",
            [{ text: 'OK' }]
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          "L'application a besoin d'accéder à votre localisation pour fonctionner correctement.",
          [{ text: 'OK' }]
        );
        return;
      }
    }
  };

  useEffect(() => {
    if (modalVisible) {
      requestLocationPermission();
    }
  }, [modalVisible]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#c80000" />
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <View style={styles.modalContainer}>
            <MapView
              provider={PROVIDER_OSM} // Utiliser OpenStreetMap
              style={styles.map}
              region={region}
              mapType="standard"
            >
              <Marker
                coordinate={{
                  latitude: latitudes || -4.35178,
                  longitude: longitude || 15.2102,
                }}
                pinColor="red"
              >
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutText}>{nom}</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>

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
  callout: {
    width: 100,
    height: 70,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
});

export default Cartemapss;