import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { CourseCategory } from '../../constant/Option';
import CourseListByCategory from '../../components/Explore/CourseListByCategory';

export default function Explore() {
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'outfit-bold',
            }}
          >
            Explore More Courses
          </Text>
          {CourseCategory.map((item, index) => (
            <View key={index} style={{ marginTop: 10 }}>
              {/* <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>
            {item}
          </Text> */}
              <CourseListByCategory category={item} />
            </View>
          ))}
        </View>
      }
    />
  );
}
