import React, {Component, useState} from 'react';
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
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      age: 0,
      email: '',
      pass: '',
      repass: '',
      about: '',
      pno: '',
      validPno: false,
      modalVisible: false,
    };
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  handlefname = (text) => {
    this.setState({fname: text});
  };

  handlelname = (text) => {
    this.setState({lname: text});
  };

  handleage = (text) => {
    this.setState({age: text});
  };

  handleemail = (text) => {
    this.setState({email: text});
  };

  handlepass = (text) => {
    this.setState({pass: text});
  };

  handlerepass = (text) => {
    this.setState({repass: text});
  };

  handlepno = (text) => {
    this.setState({pno: text});
  };

  handleabout = (text) => {
    this.setState({about: text});
  };

  onSubmit() {
    const {pno} = this.state;
    if (pno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && !pno.match(/0{5,}/)) {
      if (this.state.pass == this.state.repass) {
        this.storeData(this.state.fname);
        this.lname(this.state.lname);
        this.age(this.state.age);
        this.email(this.state.email);
        this.pass(this.state.pass);
        this.repass(this.state.repass);
        this.pno(this.state.pno);
        this.about(this.state.about);
        this.props.navigation.navigate('Questionaire');
      } else {
        alert("Password and Re-passwort doesn't match ");
        console.log(this.state.pass);
        console.log(this.state.repass);
      }
    } else {
      this.toggleModal();
    }
  }
  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('fname', value);
    } catch (e) {
      // saving error
    }
  };
  lname = async (value2) => {
    try {
      await AsyncStorage.setItem('lname', value2);
    } catch (e) {}
  };

  age = async (value3) => {
    try {
      await AsyncStorage.setItem('age', value3);
    } catch (e) {}
  };

  email = async (value4) => {
    try {
      await AsyncStorage.setItem('email', value4);
    } catch (e) {}
  };
  pass = async (value5) => {
    try {
      await AsyncStorage.setItem('pass', value5);
    } catch (e) {}
  };
  repass = async (value6) => {
    try {
      await AsyncStorage.setItem('repass', value6);
    } catch (e) {}
  };
  pno = async (value7) => {
    try {
      await AsyncStorage.setItem('pno', value7);
    } catch (e) {}
  };
  about = async (value8) => {
    try {
      await AsyncStorage.setItem('about', value8);
    } catch (e) {}
  };

  render() {
    const {navigation} = this.props;
    const {fname, lname, age, about, pass, repass, pno, email} = this.state;
    // console.log(this.state.pno)

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <LinearGradient colors={['#A45ee5', '#a1ecff']} style={{flex: 1}}>
          <View style={{height: 50, backgroundColor: 'black'}}>
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
                  /*backgroundColor:"#00203fff"*/
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Sign-Up
              </Text>
            </ImageBackground>
          </View>

          <View
            style={{
              flex: 1,
            }}>
            <ImageBackground
              source={require('../images/lBg.jpg')}
              style={{flex: 1}}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1}}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
                <ScrollView
                  //   keyboardShouldPersistTaps={true}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      padding: 10,
                      justifyContent: 'center',
                      padding: 20,
                    }}>
                    <View>
                      <TextInput
                        onChangeText={(txt) => this.handlefname(txt)}
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="fname"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 30,
                            marginTop: 20,
                          })
                        }
                        placeholder="First Name"
                        placeholderTextColor="black"
                      />
                    </View>
                    <View>
                      <TextInput
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="lname"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 30,
                            marginTop: 35,
                          })
                        }
                        placeholder="Last Name"
                        placeholderTextColor="black"
                        onChangeText={this.handlelname}
                      />
                    </View>
                    <View>
                      <TextInput
                        keyboardType="number-pad"
                        automaticallyAdjustContentInsets={true}
                        id="Age"
                        style={
                          (require,
                          {position: 'relative', fontSize: 30, marginTop: 40})
                        }
                        placeholder="age"
                        placeholderTextColor="black"
                        onChangeText={this.handleage}
                      />
                    </View>
                    <View>
                      <TextInput
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="email"
                        style={
                          (require,
                          {position: 'relative', fontSize: 30, marginTop: 45})
                        }
                        placeholder="Email-ID"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        onChangeText={this.handleemail}
                      />
                    </View>

                    <View>
                      <TextInput
                        secureTextEntry={true}
                        keyboardType="default"
                        automaticallyAdjustContentInsets={true}
                        id="Pass"
                        style={
                          (require,
                          {position: 'relative', fontSize: 30, marginTop: 45})
                        }
                        placeholder="Password"
                        placeholderTextColor="black"
                        onChangeText={this.handlepass}
                      />
                    </View>

                    <View>
                      <TextInput
                        secureTextEntry={true}
                        keyboardType="default"
                        automaticallyAdjustContentInsets={true}
                        id="repass"
                        style={
                          (require,
                          {position: 'relative', fontSize: 30, marginTop: 45})
                        }
                        placeholder="Re-Enter Password"
                        placeholderTextColor="black"
                        onChangeText={this.handlerepass}
                      />
                    </View>

                    <View>
                      <TextInput
                        keyboardType="number-pad"
                        automaticallyAdjustContentInsets={true}
                        id="pno"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 30,
                            marginTop: 50,
                          })
                        }
                        placeholder="Mobile Number"
                        placeholderTextColor="black"
                        onChangeText={this.handlepno}
                      />
                    </View>

                    <View>
                      <TextInput
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        multiline={true}
                        id="about"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 30,
                            marginTop: 50,
                          })
                        }
                        placeholder="About Yourself"
                        placeholderTextColor="black"
                        onChangeText={this.handleabout}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => this.onSubmit() /*this.sign_up*/}
                      disabled={
                        !(
                          fname &&
                          lname &&
                          age > 17 &&
                          email &&
                          pass &&
                          repass &&
                          pno
                        )
                      }
                      style={{
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 30,
                        marginTop: 80,
                        backgroundColor: 'violet',
                        width: 200,
                        elevation: 3,
                        alignSelf: 'center',
                      }}>
                      <LinearGradient
                        colors={['violet', 'violet']}
                        // colors={['#FFBF00', '#FFBF00']}
                        style={styles.gradient}>
                        <Text
                          style={{
                            fontSize: 30,
                            fontWeight: '400',
                            alignItems: 'center',
                            color: 'black',
                          }}>
                          NEXT
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  {/* </View> */}
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>
          </View>
        </LinearGradient>
        <Modal
          isVisible={this.state.modalVisible}
          style={{
            justifyContent: 'center',
            margin: 0,
          }}
          animationType={'fade'}
          transparent={true}
          onBackdropPress={() => this.toggleModal()}>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text>Wrong Mobile Number</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default SignUp;
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
const TStyle = StyleSheet.create({
  tex: {
    position: 'relative',
    fontSize: 30,
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
  container: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
});
