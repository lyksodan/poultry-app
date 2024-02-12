import React from 'react-native';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';


export default function ApoMain() {

  const navigation = useNavigation();

  return(

    <Text>Welcome to Apo Farm!</Text>

  );
}