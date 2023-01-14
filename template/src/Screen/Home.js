import React from 'react';
import {Dimensions, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const Home = props => {
  React.useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
