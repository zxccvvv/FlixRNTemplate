import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../styles/colors';

const {width, height} = Dimensions.get('window');

const Login = props => {
  React.useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 16, color: colors.black}}>Login Page</Text>
      <TouchableOpacity
        style={{backgroundColor: colors.primary, padding: 14, marginVertical: 24, paddingVertical: 8, borderRadius: 4}}
      >
        <Text style={{fontSize: 16, color: colors.whiteDark}}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={{color: colors.primary}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
