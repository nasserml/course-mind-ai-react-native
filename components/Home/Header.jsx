import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { UserDetailContext } from '../../context/UserDetailContext';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'outfit-bold',
            color: Colors.WHITE
          }}
        >
          Hello, {userDetail?.name}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'outfit',
            color: Colors.WHITE
          }}
        >
          Let's Get Started!
        </Text>
      </View>
      <TouchableOpacity >
        <Ionicons name='settings-outline' size={30} color='black' />
      </TouchableOpacity>
    </View>
  );
}
