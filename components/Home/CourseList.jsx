import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { imageAssets } from '../../constant/Option';
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function CourseList({ courseList }) {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }}>Courses</Text>
      <FlatList
        horizontal={true}
        data={courseList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={styles.courseContainer}
            onPress={() =>
              router.push({
                pathname: '/courseView/'+ item?.docId,
                params: {
                  courseParams: JSON.stringify(item),
                },
              })
            }
          >
            <Image
              source={imageAssets[item.banner_image]}
              style={{
                width: '100%',
                height: 150,
                borderRadius: 15,
              }}
            />
            <Text
              style={{ marginTop: 10, fontSize: 18, fontFamily: 'outfit-bold' }}
            >
              {item?.courseTitle}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginTop: 5,
              }}
            >
              <Ionicons name="book-outline" size={20} color="black" />
              <Text style={{ fontFamily: 'outfit' }}>
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 260,
  },
});
