import React, { useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import styles from './styles';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Your login logic here

    if (username === 'admin' && password === '1234') {
      // If login is successful, navigate to DrawerNav
      navigation.navigate('DrawerNav');
    } else {
      Alert.alert('Error', 'Incorrect username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/chickenhead.png')} style={styles.loginicon} />
      <Text style={styles.text}>Welcome to Poultrymax!</Text>
      <Input
        placeholder="Username"
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <Input
        placeholder="Password"
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
