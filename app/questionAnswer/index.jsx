import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionAnswer() {
  const { courseParams } = useLocalSearchParams();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const course = JSON.parse(courseParams);
  const router = useRouter();

  const qaList = course?.qa;
  const OnQuestionSelected = (index) => {
    console.log(qaList);
    if (selectedQuestion == index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View>
          <Image
            source={require('./../../assets/images/wave.png')}
            style={{ width: '100%', height: 800 }}
          />
          <View
            style={{
              position: 'absolute',
              padding: 20,
              width: '100%',
              marginTop: 35,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
              </Pressable>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: 'outfit-bold',
                  color: Colors.WHITE,
                }}
              >
                Question & Answers
              </Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'outfit',
                color: Colors.WHITE,
              }}
            >
              {course?.courseTitle}
            </Text>
            <FlatList
              data={qaList}
              renderItem={({ item, index }) => (
                <Pressable
                  style={styles.card}
                  key={index}
                  onPress={() => OnQuestionSelected(index)}
                >
                  <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>
                    {item?.question}
                  </Text>
                  {selectedQuestion == index && (
                    <View
                      style={{
                        borderTopWidth: 0.4,
                        marginVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: 'outfit',
                          color: Colors.GREEN,
                          marginTop: 10,
                        }}
                      >
                        Answer: {item?.answer}
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    borderRadius: 15,
    elevation: 1,
  },
});
