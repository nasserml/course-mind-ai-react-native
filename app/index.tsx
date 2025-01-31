import { Text, View } from 'react-native';
import Colors  from './../constant/Colors';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Welcome to Course Mind AI</Text>
    </View>
  );
}
