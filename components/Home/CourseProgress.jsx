import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { imageAssets } from '../../constant/Option';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';

export default function CourseProgress({ courseList }) {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }}>Progress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              margin: 7,
              padding: 15,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: 280,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <Image
                source={imageAssets[item.banner_image]}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 19, fontFamily: 'outfit-bold' }}
                  numberOfLines={2}
                >
                  {item?.courseTitle}
                </Text>
                <Text style={{ fontSize: 15, fontFamily: 'outfit' }}>
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Progress.Bar progress={0} width={250} />
              <Text style={{ fontSize: 15, fontFamily: 'outfit', marginTop:2 }}>3 out of 5  Chapters completed</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
