import React from 'react';
import { View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(){

  const navigation = useNavigation();

  const pulangi = () =>{
    navigation.navigate("Pulangi")
  }

  return(
        <View>
          <Image source={require('./assets/chicken-coop.png')} style={styles.imageCover}/>
  
          <View style={styles.farms}>
             <Text>Welcome to Poultrymax App! Please go to Menu Section to visit the farms</Text>
          </View>
        </View>
  )
}