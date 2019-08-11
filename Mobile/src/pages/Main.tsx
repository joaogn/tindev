import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

import api from '../services/api';

import logo from '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
    },
    logo: {
        marginTop: 30,
    },
    empty: {
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    avatar: {
        flex: 1,
        height: 300,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});

interface User {
    _id: string;
    name: string,
    user: string,
    bio?: string,
    avatar: string,
}

interface NavigationProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }

  type Props = NavigationProps;

export default function Main({ navigation }: Props) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState<User[]>([]);
    console.log(id);
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/api/devs/all', {
                headers: {
                    user: id,
                },
            });
         setUsers(response.data.payload);
        }
        loadUsers();
    }, [id]);

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    async function handleLike() {
        const [user, ...rest] = users;
        await api.post(`/api/devs/${user._id}/likes`, null, {
            headers: {
                user: id,
            },
        });
        setUsers(rest);
    }

    async function handleDisLike() {
        const [user, ...rest] = users;
        await api.post(`/api/devs/${user._id}/dislikes`, null, {
            headers: {
                user: id,
            },
        });
        setUsers(rest);
    }

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>


        <View style={styles.cardsContainer}>
          { users.length === 0 ? <Text style={styles.empty}>Acabou :(</Text>
          : (
            users.map((user, index) => (
              <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            ))
          )}

        </View>

        { users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDisLike}>
            <Image source={dislike} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
         )}

      </SafeAreaView>
    );
}