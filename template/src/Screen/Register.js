import React from 'react';
import {Dimensions, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const Register = props => {
  React.useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Register</Text>
    </SafeAreaView>
  );
};

export default Register;
