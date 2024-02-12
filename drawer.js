import React, {useState, useRef} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {Button} from 'react-native-elements';
import profile from './assets/chickenhead.png';
import logout from './assets/logout.png';
import chickenCoop from './assets/home.png';
import menu from './assets/menu.png';
import close from './assets/close.png'
import { useNavigation } from '@react-navigation/native';


export default function Drawer(){

  const navigation = useNavigation();

  const loggingOut = () =>{
    navigation.navigate("Login");
  }


  const [currentTab,setCurrentTab] = useState("Apo");
  const [showMenu,setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  return(
    <SafeAreaView style={styles.container}>
      <View 
          style={{
            justifyContent: 'flex-start',
            padding: 15
          }}>
        <Image 
          source={profile}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginTop: '20%'
          }}

        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20
          }}>
          Jesson Molina
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              marginTop: 7,
              color: 'white'
            }}
          >
            View Profile
          </Text>
        </TouchableOpacity>

        <View style={{
          flexGrow: 1,
          marginTop: 50
        }}>
          {TabButton(currentTab,setCurrentTab,"Apo", chickenCoop)}
          {TabButton(currentTab,setCurrentTab,"Kitanglad", chickenCoop)}
          {TabButton(currentTab,setCurrentTab,"Matutum", chickenCoop)}
          {TabButton(currentTab,setCurrentTab,"Pulangi", chickenCoop)}
        </View>

        <Button 
          title="Log Out"
          onPress={loggingOut}
          buttonStyle={{
            backgroundColor: "black"
          }}
        />


        </View>

        <Animated.View 
          style={{
            flexGrow: 1,
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: showMenu ? 15 : 0,

            transform: [
              { scale: scaleValue },
              {translateX: offsetValue}
            ]
          }}
        >

      <Animated.View style={{
        transform: [{
          translateY: closeButtonOffset
        }]
      }}>
        <TouchableOpacity onPress={() =>{

          Animated.timing(scaleValue, {
            toValue: showMenu ? 1 : 0.88,
            duration: 300,
            useNativeDriver: true
          })
          .start()

          Animated.timing(offsetValue, {
            toValue: showMenu ? 0 : 220,
            duration: 300,
            useNativeDriver: true
          })
          .start()

          Animated.timing(closeButtonOffset, {
            toValue: !showMenu ? -30 : 0,
            duration: 300,
            useNativeDriver: true
          })
          .start()

          setShowMenu(!showMenu);
          }}>

          <Image 
            source={showMenu ? close : menu}
            style={{
              width: 30,
              height: 30,
              tintColor: "black",
              marginTop: 40
            }}  
          />

          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "black",
              paddingTop: 20
            }}
          >
            {currentTab}
          </Text>
        </TouchableOpacity>

      </Animated.View>

        
      </Animated.View>
    </SafeAreaView>
  )
}

const TabButton = (currentTab,setCurrentTab,title,image) =>{
  return(
    <TouchableOpacity onPress={() => {
      setCurrentTab(title)
    }}>
      <View 
            style={{
              flexDirection: "row",
              alignItems: 'center',
              paddingVertical: 8,
              backgroundColor: currentTab == title ? 'white' : 'transparent',
              paddingLeft: 13,
              paddingRight: 35,
              borderRadius: 8,
              marginTop: 15
              
            }}
          >
            <Image 
              source={chickenCoop}
              style={{
                width: 25,
                height:25,
                tintColor: currentTab == title ? 'black' : 'white',
              }}
            />
            <Text
              style={{
                fontsize: 15,
                fontWeight: 'bold',
                color: currentTab == title ? 'black' : 'white',
                paddingLeft: 15
              }}
            >
              {title}
            </Text>
          </View>
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})