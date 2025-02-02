import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth, db } from './../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {UserDetailContext} from '../../context/UserDetailContext';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace('/(tabs)/home');
      })
      .catch((e) => {
        console.log(e);
        ToastAndroid.show('Incorrect email or password', ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  const getUserDetail = async () => {
    const user = await getDoc(doc(db, 'users', email));
    console.log(user.data());
    setUserDetail(user.data());
  };

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
      <TextInput
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}

        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          width: '100%',
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        {!loading? <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Sign In
        </Text> : <ActivityIndicator size={'small'} color={Colors.WHITE} />}
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
