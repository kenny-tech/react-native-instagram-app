import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { f, auth, database } from './config/config';

export default function App() {

  useEffect(() => {
    registerUser('test@gmail.com', 'test123!');
  });

  const registerUser = (email, password) => {
    console.log('email: ', email, 'password: ', password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((error) => console.log('error logging in', error));
  }

  return (
    <View style={styles.container}>
      <Text>React native instagram app</Text>
      <Text>Welcome to react native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
