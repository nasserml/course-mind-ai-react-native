import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { imageAssets } from '../../constant/Option';
import * as Progress from 'react-native-progress';

export default function CourseProgressCard({ item, width = 280 }) {
  const GetCompletedChapters = (course) => {
    const completedChapter = course?.completedChapter?.length;
    const perc = completedChapter / course?.chapters?.length;
    return perc;
  };
  return (
    <View
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        width: width,
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
        <Progress.Bar
          progress={GetCompletedChapters(item)}
          width={width - 30}
        />
        <Text style={{ fontSize: 15, fontFamily: 'outfit', marginTop: 2 }}>
          {item?.completedChapter?.length ?? 0} out of {item?.chapters?.length}{' '}
          Chapters completed
        </Text>
      </View>
    </View>
  );
}
