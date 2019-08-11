import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import api from '../services/api';

import logo from '../assets/logo.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,

    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

});


interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

type Props = NavigationProps;


export default function Login({ navigation }: Props) {
    const [user, setUser] = useState('');

    useEffect(() => {
      AsyncStorage.getItem('user').then((userAtivaded) => {
        if (userAtivaded) {
          navigation.navigate('Main', { user: userAtivaded });
        }
      });
    }, []);

    async function handleLogin() {
      const response = await api.post('/api/devs/create', { user });

      const { _id } = response.data.payload;

      await AsyncStorage.setItem('user', _id);
      console.log(_id);
      navigation.navigate('Main', { user: _id });
    }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <Image source={logo} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário no Github"
          placeholderTextColor="#999"
          style={styles.input}
          value={user}
          onChangeText={setUser}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
}
