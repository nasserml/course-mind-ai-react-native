import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';


export default function SignIn() {
    const router = useRouter();
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 20,
        padding: 25,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require('./../../assets/images/logo.png')}
        style={{
          width: 180,
          height: 180,
          borderRadius: 50,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>
      <TextInput placeholder="Email" style={styles.textInput} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          width: '100%',
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Sign In 
        </Text>
      </TouchableOpacity>
      <View
        style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop: 20 }}
      >
        <Text style={{ fontFamily: 'outfit' }}>Do not have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>
            Create New Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});
