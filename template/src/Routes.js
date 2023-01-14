import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {navigationRef} from './Helper/NavigationHelper';
import Home from './Screen/Home';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Welcome from './Screen/Welcome';

function MainStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default Routes = () => {
  const [Initialize, setInitialize] = React.useState(true);
  const {data} = useSelector(store => store.user);

  const init = async () => {
    setInitialize(false);
  };
  React.useEffect(() => {
    init();
  }, []);

  return <NavigationContainer ref={navigationRef}>{data ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};
