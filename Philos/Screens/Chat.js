import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
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
  FlatList,
  VirtualizedList,
  StatusBar,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {event} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

// class Chat extends Component {
//   render() {
//     return <View />;
//   }
// }
// const styles = StyleSheet.create({});
// export default Chat;

// 1.

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      fmail: '',
      grp_id: 0,
      created: '',
      msg: '',
      timePassed: false,
      chat: '',
      mail: '',
      dat: '',
      i: 0,
    };
  }

  handlemsg = (text) => {
    this.setState({msg: text});
  };
  getData = async () => {
    try {
      const value18 = await AsyncStorage.getItem('fmail');
      if (value18 !== null) {
        // alert(value);
        this.setState({
          fmail: value18,
        });
        this.onFetch();
        // console.log(this.state.fmail);
        //yahan setState karna hai
      }
    } catch (e) {
      // error reading value
    }

    // this.onChat();
  };
  componentDidUpdate() {
    this.onChat();
  }
  onChat() {
    fetch('http://5.181.217.131:5000/getchat', {
      // mode: 'cors',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        grp_id: this.state.grp_id,
        created: this.state.created,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson, 'msg');
        // console.log(responseJson.json)
        this.setState({chat: responseJson});
        console.log(this.state.chat[0]['email']);
      });
  }

  onFetch = () => {
    fetch('http://5.181.217.131:5000/chatinit', {
      mode: 'cors',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.fmail,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({
          grp_id: responseJson.grp_id,
          created: responseJson.created,
        });
        console.log(this.state.grp_id);
        console.log(this.state.created);

        this.onChat();
        //Do anything else like Toast etc.
      });
  };

  componentDidMount() {
    this.getData();
  }

  onPush() {
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var hrs = d.getHours();
    var mins = d.getMinutes();
    var sec = d.getSeconds();
    month += 1;
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hrs < 10) {
      hrs = '0' + hrs;
    }
    if (mins < 10) {
      mins = '0' + mins;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    if (true) {
      fetch('http://5.181.217.131:5000/pushchat', {
        mode: 'cors',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.fmail,
          message: this.state.msg,
          grp_id: this.state.grp_id,
          created: this.state.created,
          dt:
            year +
            '-' +
            month +
            '-' +
            date +
            ' ' +
            hrs +
            ':' +
            mins +
            ':' +
            sec,
        }),
      })
        .then((response) => response.json())
        .then((datares) => {
          console.log(datares);
          //Do anything else like Toast etc.
        });
    }
    this.setState({msg: ''});
  }

  render() {
    //testing flatlist start
    const DATA = this.state.chat;

    //end

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <LinearGradient colors={['#A45ee5', '#a1ecff']} style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <View style={{flex: 1, backgroundColor: 'red'}}>
              <ImageBackground
                source={require('../images/chat_bg.jpg')}
                style={{flex: 1}}>
                <View style={{flex: 1}}>
                  {this.state.chat.length ? (
                    <FlatList
                      data={DATA}
                      renderItem={({item}) => {
                        return (
                          <View>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 17,
                                marginLeft: 10,
                              }}>
                              {item.email}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontStyle: 'italic',
                                fontSize: 20,
                                marginLeft: 10,
                              }}>
                              {item.message}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 7,
                                marginLeft: 10,
                              }}>
                              {item.dt}
                            </Text>
                          </View>
                        );
                      }}
                      keyExtractor={(item) => item.id}
                    />
                  ) : null}
                </View>
                <View
                  style={
                    this.state.text.length < 50
                      ? [styles.linearGrad, {padding: 50}]
                      : [styles.linearGrad, {height: 80}]
                  }>
                  <View
                    style={{
                      flex: 0.8,
                      backgroundColor: 'white',
                      borderRadius: 15,
                    }}>
                    <TextInput
                      style={{
                        paddingVertical: 10,
                        fontSize: 20,
                        paddingHorizontal: 20,
                      }}
                      multiline={true}
                      placeholder={'Type here'}
                      placeholderTextColor="black"
                      // onChangeText={(txt) => {
                      //   this.setState({
                      //     text: txt,
                      //   });
                      // }}
                      onChangeText={(txt) => this.handlemsg(txt)}
                      id="msg">
                      {this.state.msg}
                    </TextInput>
                  </View>
                  <View style={{flex: 0.2}}>
                    <TouchableOpacity
                      onPress={() => this.onPush()}
                      style={{
                        backgroundColor: '#FFBF00',
                        height: 45,
                        marginLeft: 30,
                        // borderRadius: 25,
                        width: 87,
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          alignItems: 'center',
                          marginTop: 12,
                        }}>
                        Send
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Heading: {
    fontSize: 25,
    backgroundColor: '#7395AE',
  },
  gradient: {
    borderRadius: 30,
  },
  linearGrad: {
    backgroundColor: '#003333',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default Chat;
//style={{backgroundColor:'green',padding:20, justifyContent:'center'}}>
