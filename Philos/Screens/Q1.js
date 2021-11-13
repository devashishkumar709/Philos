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
import AsyncStorage from '@react-native-async-storage/async-storage';

class Q1 extends Component {
  constructor(props) {
    super(props);
    this.state = {Q1: '', Q2: '', Q3: '', Q4: ''};
  }

  handleQ1 = (text) => {
    this.setState({Q1: text});
  };

  handleQ2 = (text) => {
    this.setState({Q2: text});
  };

  handleQ3 = (text) => {
    this.setState({Q3: text});
  };

  handleQ4 = (text) => {
    this.setState({Q4: text});
  };

  onNext() {
    this.Q1(this.state.Q1);
    this.Q2(this.state.Q2);
    this.Q3(this.state.Q3);
    this.Q4(this.state.Q4);
    this.props.navigation.navigate('profile_pic');
  }
  Q1 = async (value9) => {
    try {
      await AsyncStorage.setItem('Q1', value9);
    } catch (e) {
      // saving error
    }
  };
  Q2 = async (value10) => {
    try {
      await AsyncStorage.setItem('Q2', value10);
    } catch (e) {
      // saving error
    }
  };
  Q3 = async (value11) => {
    try {
      await AsyncStorage.setItem('Q3', value11);
    } catch (e) {
      // saving error
    }
  };
  Q4 = async (value12) => {
    try {
      await AsyncStorage.setItem('Q4', value12);
    } catch (e) {
      // saving error
    }
  };

  render() {
    const {navigation} = this.props;
    const {Q1, Q2, Q3, Q4} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <LinearGradient
          colors={['#A45ee5', '#a1ecff' /*#FF6347*/]}
          style={{flex: 1}}>
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
                QUESTIONNAIRE
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
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        marginTop: 10,
                      }}>
                      Q1: What motivates you to get out of bed each morning?
                    </Text>
                    {/* <TextInput keyboardType='email-address' automaticallyAdjustContentInsets={true} multiline={true} style={require,{fontSize:20, position:'relative' ,color:'black'}}>ANS: </TextInput> */}
                    <TextInput
                      onChangeText={this.handleQ1}
                      id="Q1"
                      keyboardType="email-address"
                      automaticallyAdjustContentInsets={true}
                      multiline={true}
                      style={
                        (require,
                        {position: 'relative', fontSize: 20, marginTop: 20})
                      }
                      placeholder="ANS: "
                      placeholderTextColor="black"
                    />

                    <Text style={{fontSize: 20, color: 'black', marginTop: 30}}>
                      Q2: What is a cause you are really passionate about?
                    </Text>
                    <TextInput
                      onChangeText={this.handleQ2}
                      id="Q2"
                      keyboardType="email-address"
                      automaticallyAdjustContentInsets={true}
                      multiline={true}
                      style={
                        (require,
                        {
                          position: 'relative',
                          fontSize: 20,
                          marginTop: 35,
                        })
                      }
                      placeholder="ANS: "
                      placeholderTextColor="black"
                    />

                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        marginTop: 40,
                      }}>
                      Q3: What is your favourate kind of vacation?
                    </Text>
                    <TextInput
                      onChangeText={this.handleQ3}
                      id="Q3"
                      keyboardType="email-address"
                      automaticallyAdjustContentInsets={true}
                      multiline={true}
                      style={
                        (require,
                        {
                          position: 'relative',
                          fontSize: 20,
                          marginTop: 45,
                        })
                      }
                      placeholder="ANS: "
                      placeholderTextColor="black"
                    />

                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        marginTop: 50,
                      }}>
                      Q4: What is your favourate embarassing story?
                    </Text>
                    <TextInput
                      onChangeText={this.handleQ4}
                      id="Q4"
                      keyboardType="email-address"
                      automaticallyAdjustContentInsets={true}
                      multiline={true}
                      style={
                        (require,
                        {position: 'relative', fontSize: 20, marginTop: 50})
                      }
                      placeholder="ANS: "
                      placeholderTextColor="black"
                    />

                    <TouchableOpacity
                      onPress={
                        () => this.onNext()
                        //navigation.navigate('Profile')
                      }
                      disabled={!(Q1 && Q2 && Q3 && Q4)}
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
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
export default Q1;
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
