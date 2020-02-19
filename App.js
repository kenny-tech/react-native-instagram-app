import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { f, auth, database } from './config/config';

export default function App() {

  useEffect(() => {
    // registerUser('test@gmail.com', 'test123!');

    // checks if user is logged in
    f.auth().onAuthStateChanged(function(user) {
      if(user) {
        //Logged in
        setLoggedIn(true);
        console.log('Logged in', user);
      } else {
        //Logged out
        setLoggedIn(false);
        console.log('Logged out');
      }
    })
  });

  const loginUser = async(email, pass) => {
    if(email != '' && pass != '') {
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch(error) {
        console.log(error)
      }
    }
    else {
      alert('Missing email or password')
    }
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [emailLoginView, setEmailLoginView] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login with facebook
  const loginWithFacebook = async () => {
    const { type, token } = await Expo.Facebook.loginWithReadPermissionsAsync(
      '154238005537629',
      { permissions: ['email', 'public_profile'] }
    );

    if (type === 'success') {
      const credentials = f.auth().FacebookAuthProvider.credential(token);
      f.auth().signInWithCredential(credentials).catch((error) => {
        console.log('Error...', error);
      })
    }
  }

  const registerUser = (email, password) => {
    console.log('email: ', email, 'password: ', password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((error) => console.log('error logging in', error));
  }

  // sign out user
  const signUserOut = () => {
    auth.signOut()
    .then(() => { 
      console.log('Logged out...')
    })
    .catch((error) => {
      console.log('Error: ', error);
    });  
  }

  return (
    <View style={styles.container}>
      <Text>React native instagram app</Text>
      <Text>-----</Text>
      {
        loggedIn == true ? (
          <View>
            <TouchableHighlight
              onPress={() => signUserOut()}
              style={{backgroundColor: 'red'}}
            >
              <Text>Log Out</Text>
            </TouchableHighlight>
            <Text>Logged in...</Text>
          </View>
        ) : (
          <View>
            { 
              emailLoginView == true ? (
                <View>
                  <Text>Email:</Text>
                  <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  />
                  
                  <Text>Password:</Text>
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    value={password}
                  />
                </View>
              ):(
                <View></View>
              )
            }

            <TouchableHighlight 
              onPress={() => setEmailLoginView(true)} 
              style={{backgroundColor:'green'}}>
              <Text style={{color:'white'}}>Login with Email</Text>
            </TouchableHighlight>

            <TouchableHighlight 
              onPress={() => loginWithFacebook()} 
              style={{backgroundColor:'green'}}>
              <Text style={{color:'white'}}>Login with Facebook</Text>
            </TouchableHighlight>

            <TouchableHighlight 
              onPress={() => loginUser(email,password)} 
              style={{backgroundColor:'red'}}>
              <Text>Login</Text>
            </TouchableHighlight>
          </View>
        )
      }
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
