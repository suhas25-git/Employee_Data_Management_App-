
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import contants from 'expo-constants'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const myoptions = { title: "My sweet home", headerTintColor: "white", headerStyle: { backgroundColor: "#80bfff" } }

function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      {/* <CreateEmployee /> */}
      {/* <Profile/> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myoptions} />
        <Stack.Screen name="Create" component={CreateEmployee} options={{ ...myoptions, title: "Create Employee" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ ...myoptions, title: "Profile" }} />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
