import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';
import { imageAssets } from '../../constant/Option';
import Colors from '../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import CourseList from '../Home/CourseList';

export default function CourseListByCategory({ category }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetCourseListByCategory();
  }, [category]);
  const GetCourseListByCategory = async () => {
    setLoading(true);
    console.log(category);
    const q = query(
      collection(db, 'Courses'),
      where('category', '==', category)
      //   orderBy('createdOn', 'desc')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log('--', doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });

    setLoading(false);
  };

  return (
    <View>
      {courseList && CourseList?.length > 0 && courseList?.length != 0 && (
        <CourseList courseList={courseList} heading={category} enroll={true} />
      )}
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
