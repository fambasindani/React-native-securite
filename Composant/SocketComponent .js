// SocketComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://192.168.87.147:1200'; // Remplacez par l'URL de votre serveur

const SocketComponent = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL);

        // Écoute des notifications
        socket.on('v', (data) => {
            setUserData(data.data); 
        });

        return () => {
            socket.disconnect(); // Déconnexion lors du démontage du composant
        };
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri:"http://192.168.87.147:1200"+ item.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.nom} {item.postnom}</Text>
                <Text>{item.prenom}</Text>
                <Text>{item.email}</Text>
                <Text>{item.datenotification}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={userData}
                renderItem={renderItem}
                keyExtractor={(item) => item.envoi_id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    list: {
        paddingBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SocketComponent;