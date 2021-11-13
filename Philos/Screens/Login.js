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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {event} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      pass2: '',
      userLogin: false,
    };
  }

  // mail = async (value15) => {
  //     try {
  //       await AsyncStorage.setItem('mail', value15);
  //     } catch (e) {
  //       // saving error
  //     }
  //   };
  //   pass2 = async (value16) => {
  //     try {
  //       await AsyncStorage.setItem('pass2', value16);
  //     } catch (e) {
  //       // saving error
  //     }
  //   };

  handlemail = (text) => {
    this.setState({mail: text});
  };

  handlepass2 = (text) => {
    this.setState({pass2: text});
  };

  fmail = async (value18) => {
    try {
      await AsyncStorage.setItem('fmail', value18);
    } catch (e) {
      // saving error
    }
  };

  OnLogin = (event) => {
    this.fmail(this.state.mail);
    fetch('http://5.181.217.131:5000/login', {
      mode: 'cors',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.mail,
        pass: this.state.pass2,
      }),
    })
      .then((response) => response.json())
      .then((datares) => {
        console.log(datares);
        if (datares == 'Successfully logged-in!!!') {
          alert('Welcome to Profile Page');
          this.state.userLogin = true;
          this.state.userLogin = async (value20) => {
            try {
              await AsyncStorage.setItem('UserLogin', value20);
              console.log(value20);
            } catch (e) {
              //saving errors
            }
          };
          //   this.props.navigation.navigate('PROFILE');
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'PROFILE'}],
          });
        } else if (datares == 'Could not find your Philos Account') {
          alert("Account doesn't exists ");
        } else if (datares == 'Incorrect Password!!') {
          alert('Incorrect Password !!!');
        }
        //Do anything else like Toast etc.
      });
  };

  render() {
    const {navigation} = this.props;
    const {mail, pass2} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          // backgroundColor: '#a1ecff',
        }}>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../images/lBg.jpg')}
            style={{flex: 1}}>
            {/* <LinearGradient colors={['#5D1049','#5D1049']}
          // colors={['#A45ee5', '#a1ecff']}
           style={{flex: 1}}> */}
            <View>
              <ImageBackground
                source={require('../images/header2.png')}
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    // fontStyle: 'italic',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  LOGIN
                </Text>
              </ImageBackground>

              <View
                style={
                  (styles.inputView,
                  {
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  })
                }>
                <TextInput
                  onChangeText={this.handlemail}
                  id="mail"
                  keyboardType="email-address"
                  style={
                    (styles.inputText,
                    (require,
                    {
                      fontSize: 30,
                      color: 'black',
                      textAlign: 'center',
                      marginTop: 280,
                    }))
                  }
                  placeholder="E-Mail"
                  placeholderTextColor="white"
                  autoCapitalize="none"
                />
              </View>

              <TextInput
                onChangeText={this.handlepass2}
                id="pass2"
                secureTextEntry={true}
                keyboardType="default"
                style={
                  (require,
                  {
                    fontSize: 30,
                    color: 'black',
                    borderEndColor: '#00203fff',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    textAlign: 'center',
                  })
                }
                placeholder="Password"
                placeholderTextColor="white"
              />

              <TouchableOpacity
                onPress={() => this.OnLogin()}
                disabled={!(mail && pass2)}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FFBF00',
                  padding: 10,
                  // borderRadius: 30,
                  marginTop: 10,
                  // backgroundColor:'#00203fff',
                  width: 200,
                  elevation: 3,
                  alignSelf: 'center',
                }}>
                <LinearGradient
                  colors={['#FFBF00', '#FFBF00']}
                  style={styles.gradient}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '400',
                      alignItems: 'center',
                      color: 'black',
                    }}>
                    LOGIN
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
export default login;
const SUStyles = StyleSheet.create({
  col: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sendControlContainerOuter: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
const styles = StyleSheet.create({
  Heading: {
    fontSize: 25,
    backgroundColor: '#7395AE',
  },
  gradient: {
    borderRadius: 30,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
});
