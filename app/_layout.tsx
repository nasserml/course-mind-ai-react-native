import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { UserDetailContext } from './../context/UserDetailContext';
import { useState } from 'react';

export default function RootLayout() {
  const [userDetail, setUserDetail] = useState();
  useFonts({
    outfit: require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </UserDetailContext.Provider>
  );
}
