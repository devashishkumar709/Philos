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

class profile extends Component {
  constructor(props) {
    super(props);

    let email_r = undefined;
    this.state = {
      Name: '',
      email: '',
      about: '',
      Q1: 'Ans',
      Q2: 'Ans',
      Q3: 'Ans',
      Q4: 'Ans',
      fmail: '',
      userLogin: true,
      out_pro:
        'https://th.bing.com/th/id/OIP.TouNZxZ6zY-HetqfYQ1GHQD6D6?pid=Api&rs=1',
    };
  }

  getData = async () => {
    try {
      const value18 = await AsyncStorage.getItem('fmail');
      if (value18 !== null) {
        // alert(value);
        this.setState({
          fmail: value18,
        });
        // console.log(this.state.fmail);
        //yahan setState karna hai
      }
    } catch (e) {
      // error reading value
    }
    this.onFetch();
  };

  onFetch = () => {
    fetch('http://5.181.217.131:5000/fetchdet', {
      mode: 'cors',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.fmail,
      }),
    })
      .then((response) => response.json())
      .then((datares) => {
        // document.getElementById("name").innerHTML = " "+datares.fname+" "+datares.lname;
        // document.getElementById("res.email").innerHTML = " "+datares.email;
        // document.getElementById("res.about").innerHTML = " "+datares.about;
        this.setState({
          Name: ' ' + datares.fname + ' ' + datares.lname,
          email: ' ' + datares.email,
          about: ' ' + datares.about,
          Q1: ' ' + datares.q1,
          Q2: ' ' + datares.q2,
          Q3: ' ' + datares.q3,
          Q4: ' ' + datares.q4,
        });
        //Do anything else like Toast etc.
      });
  };
  componentDidMount() {
    this.getData();
    this.onImage();
  }

  onImage() {
    fetch('http://5.181.217.131:5000/getImage', {
      // mode: 'cors',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.fmail,
      }),
    }).then((response) => {
      // return response.json();
      console.log(response._bodyBlob._data.blobId);
      var blob = new Blob([response._bodyBlob._data.blobId], {
        type: 'text/plain',
      });
      var out_url = URL.createObjectURL(blob);
      this.setState({out_pro: out_url});
      console.log(out_url);
    });
    // .then((responseJson) => {

    //   console.log(responseJson,"blob");
    // });
  }

  onLogout() {
    this.state.userLogin = false;

    this.props.navigation.navigate('splash');
    this.state.userLogin = async (value20) => {
      try {
        await AsyncStorage.setItem('UserLogin', value20);
        console.log(value20);
      } catch (e) {}
    };
  }

  render() {
    const {navigation} = this.props;
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
                Profile
              </Text>
            </ImageBackground>
          </View>

          <View
            style={{
              flex: 1,
            }}>
            <ImageBackground
              source={require('../images/bgP3.jpg')}
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
                    <View
                      style={{
                        borderRadius: 1,
                        height: 200,
                        marginHorizontal: 30,
                        alignItems: 'center',
                        marginTop: 50,
                      }}>
                      <Image
                        source={require('../images/pp4.png')}
                        style={{height: 200, width: 200, flex: 1}}
                      />
                    </View>

                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                          })
                        }>
                        {this.state.Name}
                      </Text>

                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                          })
                        }>
                        {this.state.email}
                      </Text>

                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                          })
                        }>
                        {this.state.about}
                      </Text>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                          })
                        }>
                        Q1: What motivates you to get out of bed each morning?
                      </Text>
                    </View>
                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="Q1"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                          })
                        }>
                        {this.state.Q1}
                      </Text>
                    </View>
                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                          })
                        }>
                        Q2: What is a cause you are really passionate about?
                      </Text>
                    </View>
                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="Q2"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                          })
                        }>
                        {this.state.Q2}
                      </Text>
                    </View>

                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                          })
                        }>
                        Q3: What is your favourate kind of vacation?
                      </Text>
                    </View>

                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="Q3"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                          })
                        }>
                        {this.state.Q3}
                      </Text>
                    </View>

                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                            fontWeight: 'bold',
                          })
                        }>
                        Q4: What is your favourate embarassing story?
                      </Text>
                    </View>

                    <View>
                      <Text
                        keyboardType="email-address"
                        automaticallyAdjustContentInsets={true}
                        id="Q4"
                        style={
                          (require,
                          {
                            position: 'relative',
                            fontSize: 20,
                            marginTop: 35,
                          })
                        }>
                        {this.state.Q4}
                      </Text>
                    </View>

                    <View
                      style={{
                        padding: 5,
                        flexDirection: 'row',
                        flex: 0.2,
                        marginTop: 90,
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Chat')}
                        style={{
                          alignItems: 'center',
                          padding: 10,
                          borderRadius: 30,
                          // marginTop: 80,
                          backgroundColor: 'violet',
                          width: 150,
                          elevation: 3,
                          alignSelf: 'center',
                          marginRight: 10,
                          marginLeft: 10,
                        }}>
                        <LinearGradient
                          colors={['violet', 'violet']}
                          style={styles.gradient}>
                          <Text
                            style={{
                              fontSize: 30,
                              fontWeight: '400',
                              alignItems: 'center',
                              color: 'black',
                            }}>
                            Chat
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.onLogout()}
                        style={{
                          alignItems: 'center',
                          padding: 10,
                          borderRadius: 30,
                          // marginTop:10,
                          backgroundColor: 'violet',
                          // backgroundColor: '#FFBF00',
                          width: 150,
                          elevation: 3,
                          alignSelf: 'center',
                          marginLeft: 10,
                          marginRight: 10,
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
                            Log-Out
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* </View> */}
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default profile;
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
