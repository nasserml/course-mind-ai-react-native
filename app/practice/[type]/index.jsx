import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PracticeOption } from '../../../constant/Option';
import Colors from '../../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { UserDetailContext } from '../../../context/UserDetailContext';
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid';

export default function PracticeTypeHomeScreen() {
  const { type } = useLocalSearchParams();
  const option = PracticeOption.find((item) => item.name == type);
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, 'Courses'),
        where('createdBy', '==', userDetail?.email),
        orderBy('createdOn', 'desc')
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View>
      <Image source={option?.image} style={{ width: '100%', height: 200 }} />
      <View
        style={{
          padding: 10,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={20}
            color={'black'}
            style={{
              backgroundColor: Colors.WHITE,
              borderRadius: 20,
              padding: 5,
            }}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 35,
            fontFamily: 'outfit-bold',
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>
      {loading && (
        <ActivityIndicator
          size={'large'}
          color={Colors.PRIMARY}
          style={{
            marginTop: 150,
          }}
        />
      )}
      <CourseListGrid courseList={courseList} option={option} />
    </View>
  );
}
