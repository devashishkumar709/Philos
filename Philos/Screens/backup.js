<View style={{justifyContent: 'center', padding: 20}}>
  <View>
    <TextInput
      keyboardType="email-address"
      automaticallyAdjustContentInsets={true}
      multiline={true}
      style={(require, {fontSize: 20, position: 'relative', color: 'black'})}>
      ANS:{' '}
    </TextInput>
  </View>
  <View>
    <TextInput
      keyboardType="email-address"
      automaticallyAdjustContentInsets={true}
      id="fname"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 20})}
      placeholder="First Name"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>
  <View>
    <TextInput
      keyboardType="email-address"
      automaticallyAdjustContentInsets={true}
      id="lname"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 35})}
      placeholder="Last Name"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>
  <View>
    <TextInput
      keyboardType="number-pad"
      automaticallyAdjustContentInsets={true}
      id="age"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 50})}
      placeholder="Age"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>
  <View>
    <TextInput
      keyboardType="email-address"
      automaticallyAdjustContentInsets={true}
      id="email"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 45})}
      placeholder="Emai-ID"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>
  <View>
    <TextInput
      secureTextEntry={true}
      keyboardType="default"
      automaticallyAdjustContentInsets={true}
      id="pass"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 45})}
      placeholder="Password"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>

  <View>
    <TextInput
      secureTextEntry={true}
      keyboardType="default"
      automaticallyAdjustContentInsets={true}
      id="repass"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 45})}
      placeholder="Re-Enter Password"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>
  <View>
    <TextInput
      keyboardType="number-pad"
      automaticallyAdjustContentInsets={true}
      id="pno"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 50})}
      placeholder="Mobile Number"
      placeholderTextColor="black"
    />
  </View>
  <Text></Text>
  <View>
    <TextInput
      keyboardType="email-address"
      automaticallyAdjustContentInsets={true}
      multiline={true}
      id="about"
      style={(require, {position: 'relative', fontSize: 30, marginTop: 50})}
      placeholder="About Yourself"
      placeholderTextColor="black"
    />
  </View>
  <TouchableOpacity
    onPress={() => navigation.navigate('Q1') /*this.sign_up*/}
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
      NEXT
    </Text>
  </TouchableOpacity>
</View>;
