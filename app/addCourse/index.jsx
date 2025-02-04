import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../../constant/Colors';
import { TextInput } from 'react-native';
import Button from '../../components/Shared/Button';
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from './../../config/AiModel';
import Prompt from '../../constant/Prompt';
import { db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
import { useRouter } from 'expo-router';

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [topics, setTopics] = useState();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const onGenerateTopic = async () => {
    setLoading(true);
    console.log(userInput);
    // Get Topic Ideas from AI Model
    const PROMPT = userInput + Prompt.IDEA;
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    const topicIdea = JSON.parse(aiResp.response.text());
    console.log(topicIdea);
    setTopics(topicIdea);
    setLoading(false);
  };

  const onTopicSelected = (topic) => {
    const isAlreadyExist = selectedTopics.find((item) => item == topic);
    if (!isAlreadyExist) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      setSelectedTopics(topics);
    }
  };
  const isTopicSelected = (topic) => {
    const selection = selectedTopics.find((item) => item == topic);
    return selection ? true : false;
  };

  /**
   * Used to Generate Course using AI Model
   */
  const onGenerateCourse = async () => {
    setLoading(true);
    try {
      const PROMPT = selectedTopics + Prompt.COURSE;
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(aiResp.response.text());

      const courses = resp.courses;
      console.log(courses);
      // Save Course Info to database
      for (const course of courses) {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'Courses', docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email ?? '',
          docId: docId,
        });
      }
      //   courses?.forEach(async (course) => {});
      router.push('/(tabs)/home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 25, backgroundColor: Colors.WHITE }}>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>
        Create New Course
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'outfit',
        }}
      >
        What you want to learn today?
      </Text>
      <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What course you want to create (ex.Learn Python, Digital Marketing, 10th
        Science Chapters, etc..)
      </Text>
      <TextInput
        placeholder="(Ex. Learn Python, Learn 12th Chemistry)"
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        text={'Create Topic'}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit',
          }}
        >
          Select all topics which you want to add in the course
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: 6,
          }}
        >
          {topics?.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelected(item)}>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                  padding: 7,
                  borderRadius: 99,
                  borderWidth: 0.4,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : Colors.WHITE,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {selectedTopics?.length > 0 && (
        <Button
          loading={loading}
          text={'Generate Course'}
          type="fill"
          onPress={() => onGenerateCourse()}
          style={{ marginTop: 15, marginBottom: 15 }}
        />
      )}
      <View style={{ height: 50 }}>
        <Text
          style={{ fontSize: 18, fontFamily: 'outfit', color: Colors.WHITE }}
        >
          {'View '}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: 'flex-start',
    fontSize: 18,
  },
});
