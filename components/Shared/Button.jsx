import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';

export default function Button({
  text,
  type = 'fill',
  onPress,
  loading = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 15,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: type === 'fill' ? Colors.PRIMARY : Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
      }}
    >
      {!loading ? (
        <Text
          style={{
            textAlign: 'center',
            color: type === 'fill' ? Colors.WHITE : Colors.PRIMARY,
            fontSize: 18,
          }}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size="small"
          color={type === 'fill' ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
}
