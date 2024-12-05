import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../Couleurs/COLORS';

const ImagePickerComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const defaultImage = require('../assets/user.png'); // Image par défaut

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', "Nous avons besoin de votre permission pour accéder à la bibliothèque d'images.");
            }
        })();
    }, []);

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // Met à jour l'image
            setModalVisible(false); // Ferme la modale
        }
    };

    const selectFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // Met à jour l'image
            setModalVisible(false); // Ferme la modale
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={image ? { uri: image.uri } : defaultImage} 
                    style={styles.image} 
                />
                <TouchableOpacity 
                    style={styles.iconContainer} 
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="photo-camera" size={15} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Modal pour choisir entre prendre une photo ou sélectionner une image */}
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Choisissez une option</Text>
                        
                        <View style={styles.iconRow}>
                            <TouchableOpacity style={styles.iconItem} onPress={takePhoto}>
                                <Icon name="camera-alt" size={40} color="#000" />
                                <Text style={styles.iconText}>Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.iconItem} onPress={selectFromGallery}>
                                <Icon name="photo-library" size={40} color="#000" />
                                <Text style={styles.iconText}>Galerie</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.blanccasse,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginVertical: 10,
        width: '90%',
        marginBottom: 20,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderColor: COLORS.grey,
        borderWidth: 0.2,
        resizeMode: 'cover',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        backgroundColor: COLORS.blanccasse,
        padding: 10,
        borderRadius: 25,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: COLORS.blanccasse,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    iconItem: {
        alignItems: 'center',
    },
    iconText: {
        textAlign: 'center',
        marginTop: 5,
    },
    closeButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ImagePickerComponent;