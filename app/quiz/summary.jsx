import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from './../../constant/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Button from '../../components/Shared/Button';
export default function QuizSummary() {
  const { quizResultParams } = useLocalSearchParams();
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const router = useRouter();
  const quizResult = JSON.parse(quizResultParams);
  useEffect(() => {
    CalculateResult();
  }, [quizResult]);
  const CalculateResult = () => {
    const correctAns_ = Object.entries(quizResult)?.filter(
      ([key, value]) => value?.isCorrect == true
    );
    console.log(correctAns_);
    const totalQues_ = Object.keys(quizResult).length;
    setCorrectAns(correctAns_.length);
    setTotalQuestion(totalQues_);
  };

  const GetPercMark = () => {
    return ((correctAns / totalQuestion) * 100).toFixed(0);
  };
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View>
          <Image
            source={require('../../assets/images/wave.png')}
            style={{
              width: '100%',
              height: 700,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              padding: 35,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'outfit-bold',
                color: Colors.WHITE,
                textAlign: 'center',
              }}
            >
              Quiz Summary
            </Text>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                padding: 20,
                borderRadius: 20,
                marginTop: 60,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('./../../assets/images/trophy.png')}
                style={{ width: 100, height: 100, marginTop: -60 }}
              />
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: 'outfit-bold',
                }}
              >
                {GetPercMark() > 60 ? 'Congratulations!' : 'Try Again!'}
              </Text>
              <Text
                style={{
                  fontFamily: 'outfit',
                  color: Colors.GRAY,
                  fontSize: 17,
                }}
              >
                Your gave {GetPercMark()}% Correct Answer
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>Q {totalQuestion} </Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>✅ {correctAns} </Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>
                    ❌ {totalQuestion - correctAns}{' '}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              text={'Go To Home'}
              onPress={() => router.replace('/(tabs)/home')}
            />
            <View
              style={{
                marginTop: 25,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 25,
                }}
              >
                Summary:
              </Text>
              <FlatList
                data={Object.entries(quizResult)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item, index }) => {
                  const quizItem = item[1]; // Access the actual quiz item
                  return (
                    <View
                      style={{
                        padding: 15,
                        borderWidth: 1,
                        marginTop: 5,
                        borderRadius: 15,
                        backgroundColor:
                          quizItem?.isCorrect == true
                            ? Colors.LIGHT_GREEN
                            : Colors.LIGHT_RED,
                        borderColor:
                          quizItem?.isCorrect == true
                            ? Colors.GREEN
                            : Colors.RED,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                        }}
                      >
                        {quizItem?.question}
                      </Text>
                      <Text>Ans: {quizItem?.correctAns}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  resultTextContainer: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    elevation: 1,
  },
  resultText: {
    fontFamily: 'outfit',
    fontSize: 20,
  },
});
