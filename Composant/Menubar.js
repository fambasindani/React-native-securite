// BottomTab.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Menubar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = 'home';
          } else if (route.name === 'À propos') {
            iconName = 'info-circle';
          } else if (route.name === 'Contact') {
            iconName = 'phone';
          } else if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50', // Couleur active
        tabBarInactiveTintColor: '#fff', // Couleur inactive (blanc pour contraste)
        tabBarStyle: {
          backgroundColor: '#000', // Fond noir
          height: 60, // Hauteur de la barre
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="À propos" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

// Composants d'écran
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'écran d'accueil!</Text>
    </View>
  );
};

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos de nous!</Text>
    </View>
  );
};

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactez-nous!</Text>
    </View>
  );
};

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de bord</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
  },
});

export default Menubar;