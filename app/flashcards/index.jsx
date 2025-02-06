import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import FlipCard from 'react-native-flip-card';
import * as Progress from 'react-native-progress';

export default function Flashcards() {
  const { courseParams } = useLocalSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const course = JSON.parse(courseParams);
  const router = useRouter();

  const flashcard = course?.flashcards;
  const width = Dimensions.get('screen').width;

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(index);
  };
  const GetProgress = (currentPage) => {
    const perc = currentPage / flashcard?.length;
    return perc;
  };
  return (
    <View>
      <Image
        source={require('./../../assets/images/wave.png')}
        style={{ width: '100%', height: 800 }}
      />
      <View style={{ position: 'absolute', padding: 25, width: '100%' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
          </Pressable>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'outfit-bold',
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {flashcard?.length}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Progress.Bar
            progress={GetProgress(currentPage) + 1 / flashcard?.length}
            width={Dimensions.get('screen').width * 0.85}
            color={Colors.LIGHT_RED}
            height={10}
          />
        </View>
        <FlatList
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={flashcard}
          onScroll={onScroll}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                height: 500,
                marginTop: 60,
                marginHorizontal: Dimensions.get('screen').width * 0.04,
              }}
            >
              <FlipCard style={styles.flipCard}>
                <View style={styles.frontCard}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: 'outfit-bold',
                    }}
                  >
                    {item?.front}
                  </Text>
                </View>
                <View style={styles.backCard}>
                  <Text
                    style={{
                      width: Dimensions.get('screen').width * 0.78,
                      padding: 20,
                      fontSize: 28,
                      fontFamily: 'outfit',
                      textAlign: 'center',
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flipCard: {
    width: Dimensions.get('screen').width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // marginHorizontal: Dimensions.get('screen').width * 0.04,
    // margin: 'auto',
  },
  frontCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: '100%',
  },
  backCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
  },
});
