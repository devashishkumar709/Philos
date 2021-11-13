import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignUp from './Screens/Sign-Up';
import Login from './Screens/Login';
import Q1 from './Screens/Q1';
import Start from './Screens/Start';
import splash from './Screens/splash';
import profile_pic from './Screens/profile_pic';
import profile from './Screens/profile';
import Chat from './Screens/Chat';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavi() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#4a4a4a',
        shadowColor: '#f2f2f2',
      }}>
      <Drawer.Screen name="Start" component={Start} />
      <Drawer.Screen name="Sign-Up" component={SignUp} />
      <Drawer.Screen name="Log-In" component={Login} />
    </Drawer.Navigator>
  );
}
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Start"
        component={DrawerNavi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Log-In"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PROFILE"
        component={profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Sign-Up"
        component={SignUp}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Questionaire"
        component={Q1}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="profile_pic"
        component={profile_pic}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
