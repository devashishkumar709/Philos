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

class login extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={SUStyles.col}>
        <View>
          <ImageBackground
            source={require('../images/Qbg.jpg')}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontStyle: 'italic',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#FFFFFF',
              }}>
              LOGIN
            </Text>
          </ImageBackground>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          {/* <KeyboardAvoidingView 
                    style={
                        SUStyles.sendControlContainerOuter
                        } 
                        keyboardVerticalOffset={-120}
                        {...(Platform.OS === "ios" ? { behavior: 'position' } : {})
                        }>
                    <InputScrollView 
                    style={{
                        flex:1}} 
                        scrollEnabled={true} 
                        keyboardShouldPersistTaps={true}
                        automaticallyAdjustContentInsets={true}>
                        <View style={{
                            alignItems:'center',
                            marginBottom:250,
                            justifyContent:'center',
                            alignContent:'center',
                            alignSelf:'center'
                            }}>  */}

          <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <TextInput
              keyboardType="email-address"
              style={
                (require,
                {
                  fontSize: 30,
                  color: 'black',
                  borderEndColor: '#00203fff',

                  textAlign: 'center',
                })
              }
              placeholder="E-Mail"
              placeholderTextColor="black"
            />
          </View>

          <View>
            <TextInput
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
                  textAlign: 'center',
                })
              }
              placeholder="Password"
              placeholderTextColor="black"
            />
          </View>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 10,
              borderRadius: 30,
              marginTop: 80,
              backgroundColor: '#00203fff',
              width: 200,
              elevation: 3,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '400',
                alignItems: 'center',
                color: 'white',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>

        {/* </InputScrollView>
                     </KeyboardAvoidingView> */}
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
