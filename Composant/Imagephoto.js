import { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Modal, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Couleurs/COLORS';
import * as ImagePicker from 'expo-image-picker';


export default function Imagephoto({setimage,defimage, setdefimage,  image,selectFromGallery, takePhoto, modalVisible,  setModalVisible}) {
 // const df = require('../assets/user.png');
  //const df = 'http://192.168.205.147:1200/static/Image/c3a60eb4-3a42-4ffa-8454-bdfa9f92096d.jpeg';
    // Fonction pour prendre une photo
   

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                  
                    source={image ? { uri: image.uri } : { uri: defimage }} 
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
}


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