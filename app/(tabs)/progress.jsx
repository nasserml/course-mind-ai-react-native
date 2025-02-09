import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../../context/UserDetailContext';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <View>
      <Image
        source={require('./../../assets/images/wave.png')}
        style={{
          position: 'absolute',
          height: 500,
        }}
      />
      <View
        style={{
          position: 'absolute',
          padding: 20,
          width: '100%',
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'outfit-bold',
            color: Colors.WHITE,
            marginBlock: 10,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={() => GetCourseList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: '/courseView/' + item?.docId,
                  params: {
                    courseParams: JSON.stringify(item),
                  },
                })
              }
            >
              <CourseProgressCard item={item} width={'90%'} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
