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
import ImagePicker from 'react-native-image-picker';
import {event} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCamera: true,
      avatarSource: require('../images/profile2.png'),
      f_name: '',
      l_name: '',
      age: 0,
      pno: 0,
      e_mail: '',
      about: '',
      pass: '',
      repass: '',
      Q1: '',
      Q2: '',
      Q3: '',
      Q4: '',
      lat: '',
      lng: '',
      uri: '',
    };
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('fname');
      const value2 = await AsyncStorage.getItem('lname');
      const value3 = await AsyncStorage.getItem('age');
      const value4 = await AsyncStorage.getItem('email');
      const value5 = await AsyncStorage.getItem('pass');
      const value6 = await AsyncStorage.getItem('repass');
      const value7 = await AsyncStorage.getItem('pno');
      const value8 = await AsyncStorage.getItem('about');
      const value9 = await AsyncStorage.getItem('Q1');
      const value10 = await AsyncStorage.getItem('Q2');
      const value11 = await AsyncStorage.getItem('Q3');
      const value12 = await AsyncStorage.getItem('Q4');
      const value13 = await AsyncStorage.getItem('ltt');
      const value14 = await AsyncStorage.getItem('lnn');
      if (value !== null) {
        // alert(value);
        this.setState({
          f_name: value,
          l_name: value2,
          e_mail: value4,
          age: value3,
          pass: value5,
          repass: value6,
          pno: value7,
          about: value8,
          Q1: value9,
          Q2: value10,
          Q3: value11,
          Q4: value12,
          lat: value13,
          lng: value14,
        });
        console.log(value);
        console.log(value2);
        console.log(value3);
        console.log(value4);
        console.log(value5);
        console.log(value6);
        console.log(value7);
        console.log(value8);
        console.log(value9);
        console.log(value10);
        console.log(value11);
        console.log(value12);
        console.log(value13);
        console.log(value14);
        //yahan setState karna hai
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }
  signUp = (event) => {
    fetch('http://5.181.217.131:5000', {
      mode: 'cors',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        fname: this.state.f_name,
        lname: this.state.l_name,
        age: this.state.age,
        pno: this.state.pno,
        email: this.state.e_mail,
        about: this.state.about,
        password: this.state.pass,
        lat: this.state.lat,
        lng: this.state.lng,
        q1: this.state.Q1,
        q2: this.state.Q2,
        q3: this.state.Q3,
        q4: this.state.Q4,
        profession: 2,
      }),
    })
      .then((response) => response.json())
      .then((datares) => {
        console.log(datares);
        if (datares == 'Data recieved!!') {
          alert('Succesfully registered');
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Log-In'}],
          });
        }
        //Do anything else like Toast etc.
      });
    this.loadFile();
  };

  loadFile = (event) => {
    const fd = new FormData();
    fd.append('myFile', this.state.uri, this.state.e_mail + '.jpg');
    fetch('http://5.181.217.131:5000/saveImage', {
      method: 'POST',
      body: fd,
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };

  handleLibrary() {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
      this.setState({uri: response.uri});
      console.log(this.state.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  handlePhoto() {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);
      this.setState({uri: response.uri});
      console.log(this.state.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <LinearGradient colors={['#A45ee5', '#a1ecff']} style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <ImageBackground
                source={require('../images/header2.png')}
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 450,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'black',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                  }}>
                  Select Image
                </Text>
              </ImageBackground>
            </View>
            <ImageBackground
              source={require('../images/lBg.jpg')}
              style={{flex: 1}}>
              <View
                style={{
                  borderRadius: 1,
                  height: 200,
                  marginHorizontal: 30,
                  alignItems: 'center',
                  marginTop: 50,
                }}>
                <Image
                  source={this.state.avatarSource}
                  style={{height: 150, width: 150}}></Image>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  flex: 0.2,
                  marginTop: 90,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{marginLeft: 10, marginRight: 10}}
                  onPress={() => this.handlePhoto()}>
                  <Image
                    source={require('../images/camera2.png')}
                    style={{height: 50, width: 50}}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: 10, marginRight: 10}}
                  onPress={() => this.handleLibrary()}>
                  <Image
                    source={require('../images/gallery2.png')}
                    style={{height: 50, width: 50}}></Image>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={this.signUp}
                style={{
                  alignItems: 'center',
                  padding: 10,
                  // borderRadius: 30,
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
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </ImageBackground>
          </LinearGradient>
        </View>
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
const styles = StyleSheet.create({
  Heading: {
    fontSize: 25,
    backgroundColor: '#7395AE',
  },
  gradient: {
    borderRadius: 30,
  },
});
