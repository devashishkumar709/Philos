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
import LinearGradient from 'react-native-linear-gradient';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import GetLocation from 'react-native-get-location';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ltt: '',
      lnn: '',
    };
  }

  handlelat = (text) => {
    this.setState({ltt: text});
  };
  handlelng = (text) => {
    this.setState({lnn: text});
  };

  onNext() {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then((granted) => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
          (locations) => {},
        );
      }
    });

    RNLocation.configure({distanceFilter: 0});
    RNLocation.getLatestLocation({timeout: 60000}).then((latestLocation) => {
      // Use the location here
      console.log(latestLocation.latitude);
      console.log(latestLocation.longitude);
      this._storeLocation(latestLocation.latitude.toString());
      this.storeLong(latestLocation.longitude.toString());

      // latestLocation.longitude = async () => {
      //   try {
      //     await AsyncStorage.setItem('lnn', );
      //   } catch (e) {
      //     // saving error
      //   }
      // };
    });

    this.props.navigation.navigate('Sign-Up');
  }

  _storeLocation = async (value1) => {
    try {
      await AsyncStorage.setItem('ltt', value1);
    } catch (error) {
      // Error saving data
    }
  };
  storeLong = async (value2) => {
    try {
      await AsyncStorage.setItem('lnn', value2);
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <LinearGradient
          colors={['black', 'black']}
          // colors={['#A45ee5', '#a1ecff']}
        >
          <ImageBackground
            source={require('../images/black2.jpg')}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'white',
                textAlign: 'center',
                // fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              PHILOS
            </Text>
          </ImageBackground>

          <View
            style={{
              flexDirection: 'column',
              position: 'relative',
              marginTop: 200,
              marginLeft: 12,
              alignItems: 'center',
              height: '100%',
            }}>
            <Image
              source={require('../images/main3.jpeg')}
              style={{
                height: 100,
                width: 100,
              }}></Image>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Log-In')}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#800000',
                  // backgroundColor: '#FFBF00',
                  padding: 10,
                  borderRadius: 30,
                }}>
                <LinearGradient
                  colors={['#800000', '#800000']}
                  // colors={['#FFBF00', '#FFBF00']}
                  style={styles.gradient}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '400',
                      color: 'white',
                      fontFamily: 'Helvetica',
                    }}>
                    Log-In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => this.onNext()
                  //  navigation.navigate('Sign-Up')
                }
                style={{
                  alignItems: 'center',
                  backgroundColor: '#800000',
                  // backgroundColor:'#00203fff',
                  borderRadius: 30,
                  padding: 10,
                  marginTop: 10,
                }} /*onPress={()=>{navigation.navigate("SignUp")}}*/
              >
                <LinearGradient
                  colors={['#800000', '#800000']}
                  // colors={['#FFBF00', '#FFBF00']}
                  style={styles.gradient}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '400',
                      color: 'white',
                    }}>
                    SignUp (Mobile number)
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
// const appNavigator=createStackNavigator({
//     Home:{
//         screen: Start
//     },
//     SignUp:{
//         screen:SignUp
//     }
// })

export default Start;

const styles = StyleSheet.create({
  Heading: {
    fontSize: 25,
    backgroundColor: '#7395AE',
  },
  gradient: {
    borderRadius: 30,
  },
});
