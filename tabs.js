import Reach from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import HomeScreen from './homescreen';
import CreateFarm from './createFarm';
import Settings from './settings';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View
    style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#ff2323' 
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {

  return(
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          borderWidth: 0.5,
          ...styles.shadow
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({focused}) => (
          <View 
              style={{
                alignItems: 'center', 
                justifyContent:'center',
                top: 10
              }}>
            <Image
              source={require('./assets/iconHome.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#ff2323' : '#ff5757'
              }}
            />
            <Text>Home</Text>
          </View>
        ),
        title: "",
        headerShown: false
      }}
      />
      {/* <Tab.Screen name="Create Farm" component={CreateFarm} options={{
        tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/iconPlus.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff'
              }}
            />
        ),
        tabBarButton: (props)=>(
          <CustomTabBarButton {...props} />
        )
      }}
      /> */}
      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarIcon: ({focused}) => (
          <View 
              style={{
                alignItems: 'center', 
                justifyContent:'center',
                top: 10
              }}>
            <Image
              source={require('./assets/iconSettings.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#ff2323' : '#ff9494'
              }}
            />
            <Text>Settings</Text>
          </View>
        ),
        headerShown: false
      }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#920a0a',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5
  }
})


export default Tabs;