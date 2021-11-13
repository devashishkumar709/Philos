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
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class splash extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserLogin');
      if (value == true) {
        // alert(value);
        this.props.navigation.navigate('PROFILE');
        console.log(value);
        //yahan setState karna hai
      } else if (value == false || value == null) {
        setTimeout(() => {
          console.log(value);
          // navigation.navigate("Start")
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Start'}],
          });
        }, 2000);
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const {navigation} = this.props;
    // setTimeout(() => {
    //     // navigation.navigate("Start")
    //     this.props.navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'Start' }],
    //       });
    // }, 2000);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../images/main3.jpeg')}
            style={{height: 150, width: 150}}></Image>
        </View>
      </SafeAreaView>
    );
  }
}
export default splash;
