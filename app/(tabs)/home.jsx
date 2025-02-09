import { View, Text, Platform, FlatList, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Home/Header';
import Colors from '../../constant/Colors';
import NoCourse from '../../components/Home/NoCourse';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
import CourseList from '../../components/Home/CourseList';

import PracticeSection from '../../components/Home/PracticeSection';
import CourseProgress from '../../components/Home/CourseProgress';

export default function Home() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    console.log(userDetail?.email);
    const q = query(
      collection(db, 'Courses'),
      where('createdBy', '==', userDetail?.email),
      orderBy('createdOn', 'desc')
    );

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log('--', doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <FlatList
      data={[]}
      onRefresh={() => GetCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Image
            source={require('./../../assets/images/wave.png')}
            style={{
              position: 'absolute',
              width: '100%',
              height: 500,
            }}
          />
          <View
            style={{
              padding: 25,
              paddingTop: Platform.OS == 'ios' && 45,
              // flex: 1,
              // backgroundColor: Colors.WHITE,
            }}
          >
            <Header />
            {courseList?.length == 0 ? (
              <NoCourse />
            ) : (
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
}
