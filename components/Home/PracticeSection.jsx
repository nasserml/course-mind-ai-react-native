import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { PracticeOption } from '../../constant/Option';
import Colors from '../../constant/Colors';

export default function PracticeSection() {
  console.log(PracticeOption);
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }}>Practice</Text>
      <View>
        <FlatList
          numColumns={3}
          data={PracticeOption}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                flex: 1,
                margin: 5,
                aspectRatio:1
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 10,
                }}
              />
              <Text style={{
                position: "absolute",
                padding: 15,
                fontFamily: 'outfit',
                fontSize: 15,
                color: Colors.WHITE
              }}>
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
