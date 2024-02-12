import React from 'react-native';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';


export default function MatutumMain() {

  const navigation = useNavigation();

  return(

    <Text>Welcome to Matutum Farm!</Text>

  );
}