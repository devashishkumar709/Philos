import React, { Component } from 'react';
import {SafeAreaView, TouchableOpacity, Image,ImageBackground,Text, StyleSheet, TextStyle,View,TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

class Q1 extends Component{
    constructor(props){
        super(props);
        this.state={Q1:"", Q2:'', Q3:'',Q4:''}
    }

    render(){
        const {navigation}=this.props;
        return(
            <SafeAreaView style={SUStyles.col}>
                <View style={{flex:0.5}}>
                <ImageBackground source={require('../images/Qbg.jpg')} style={{ height:50, justifyContent:'center',alignItems:'center'}} >
                <Text style={{fontSize:30, fontStyle:'italic', alignItems:'center',/*backgroundColor:"#00203fff"*/ textAlign:'center', color:"#FFFFFF"}}>QUESTIONNAIRE</Text>
                </ImageBackground>
                </View>
               
                <View style={{backgroundColor:'#FFFFFF',flex:6}}>
                
                <KeyboardAvoidingView style={SUStyles.sendControlContainerOuter} keyboardVerticalOffset={-120}{...(Platform.OS === "ios" ? { behavior: 'padding' } : {})}>
                <InputScrollView style={{flex:1}} scrollEnabled={true} keyboardShouldPersistTaps={true} /*keyboardDismissMode='on-drag'*/ automaticallyAdjustContentInsets={true}>
                <View style={{justifyContent:'center', flex:1}}>
                <Text></Text>
                <Text style={{fontSize:20, color:'black',marginTop:10}}>Q1: What motivates you to get out of bed each morning?</Text>
                {/* <TextInput keyboardType='email-address' automaticallyAdjustContentInsets={true} multiline={true} style={require,{fontSize:20, position:'relative' ,color:'black'}}>ANS: </TextInput> */}
                <TextInput keyboardType='email-address' automaticallyAdjustContentInsets={true} multiline={true} style={require,{position:'relative',fontSize:20,marginTop:20} } placeholder="ANS: " placeholderTextColor='black' />
                
                <Text></Text>

                <Text style={{fontSize:20, color:'black',marginTop:30}}>Q2: What is a cause you are really passionate about?</Text>
                <TextInput keyboardType='email-address' automaticallyAdjustContentInsets={true} multiline={true} style={require,{position:'relative',fontSize:20,marginTop:35} } placeholder="ANS: " placeholderTextColor='black' />
                
                <Text></Text>

                <Text style={{fontSize:20, color:'black',marginTop:40}}>Q3: What is your favourate kind of vacation?</Text>
                <TextInput keyboardType='email-address' automaticallyAdjustContentInsets={true} multiline={true} style={require,{position:'relative',fontSize:20,marginTop:45} } placeholder="ANS: " placeholderTextColor='black' />

                <Text></Text>

                <Text style={{fontSize:20, color:'black',marginTop:50}}>Q4: What is your favourate embarassing story?</Text>
                <TextInput keyboardType='email-address' automaticallyAdjustContentInsets={true} multiline={true} style={require,{position:'relative',fontSize:20,marginTop:50} } placeholder="ANS: " placeholderTextColor='black' />

                <TouchableOpacity onPress={()=> navigation.navigate("LoginScreen")} style={{alignItems:'center',padding:10, borderRadius:30, marginTop:80, backgroundColor:'#00203fff', width:200,elevation:3,alignSelf:'center'}}>
                <Text  style={{fontSize:30, fontWeight:'400', alignItems:'center',color:'white'}}>NEXT</Text>
                </TouchableOpacity>

                </View>
                </InputScrollView>
                </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Q1;
const SUStyles = StyleSheet.create({
    col:{
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    sendControlContainerOuter: {
        flex: 1,
        justifyContent: 'flex-end'
        }
})