import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth, db } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const CreateAccount = () => {
    setLoading(true);
    console.log({ email });
    console.log({ password });
    // return;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        // Signed in user info
        const user = resp.user;
        console.log(user);
        // Save user to database
        await SaveUser(user);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  };

  const SaveUser = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    };
    await setDoc(doc(db, 'users', email), data);

    setUserDetail(data);

    // Navigate to New Screen
    router.replace('/auth/signIn');
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
        Create New Account
      </Text>
      <TextInput
        onChangeText={(value) => setFullName(value)}
        placeholder="Full Name"
        style={styles.textInput}
      />
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
        onPress={CreateAccount}
        disabled={loading}
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
          Create Account
        </Text>
      </TouchableOpacity>
      <View
        style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop: 20 }}
      >
        <Text style={{ fontFamily: 'outfit' }}>Already have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>
            Sign In Here
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
