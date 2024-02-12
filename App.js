import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './login';
import HomeScreen from '../Poultrymaxph/homescreen';
import Pulangi from './farms/pulangi/pulangi-main';
import Apo from './farms/apo/apo-main';
import Kitanglad from './farms/kitanglad/kitanglad-main';
import Matutum from './farms/matutum/matutum-main';

import DrawerContent from './drawercontent';

//Import and Initialize firebase

import { app, db } from "./firebase/pulangi-firebase"; // Replace with the actual path
import { collection, addDoc } from 'firebase/firestore';


const StackNav=()=>{

  const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator
        screenOptions={{
          statusBarColor: "white",
          headerStyle: {
            backgroundColor: '#1c1c1c',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
    >
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: true}} />
    
    </Stack.Navigator>

  );
}

const DrawerNav=()=>{
  const Drawer=createDrawerNavigator();
  return(
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props}/>}
      screenOptions={{
        statusBarColor: "#1c1c1c",
        headerStyle: {
          backgroundColor: '#0f0f0f',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen 
        name='Home' 
        component={HomeScreen}
      />
      <Drawer.Screen 
        name='Apo' 
        component={Apo}
      />
      <Drawer.Screen 
        name='Kitanglad' 
        component={Kitanglad}/>
      <Drawer.Screen 
        name='Matutum' 
        component={Matutum}/>
      <Drawer.Screen 
        name='Pulangi' 
        component={Pulangi}/>
    </Drawer.Navigator>
    
  );
}
export default function App() {
  
  return (
    <NavigationContainer>
        <DrawerNav/>
    </NavigationContainer>

  );
}
