import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadInitialPosition() {
            let granted = await requestPermissionsAsync()
            
            if (granted) {
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = location.coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        try {
            const response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    techs
                }
            })

            setDevs(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    function handleRegionChange(region) {
        setCurrentRegion(region)
    }

    if (!currentRegion)
        return null

    return (
        <>
            <MapView style={styles.map} initialRegion={currentRegion} onRegionChangeComplete={handleRegionChange}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                    <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                    <Callout onPress={() => {
                        navigation.navigate('Profile', {github_username: dev.github_username})
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name || dev.github_username}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Search by Techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    onChangeText={text => {setTechs(text)}}
                />
                <TouchableOpacity style={styles.button} onPress={loadDevs}>
                    <MaterialIcons name="my-location" color="#FFF" style={styles.icon}></MaterialIcons>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#FFF'
    },
    callout: {
        width: 240,
        borderWidth: 0,    
    },
    devName: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    devBio: {
        fontSize: 12,
        color: '#505050'
    },
    devTechs: {
        fontSize: 12,
        color: '#505050',
        fontWeight: "bold"
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        backgroundColor: '#FFF',
        height: 50,
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#7D40E7',
        paddingVertical: 11.5,
        marginLeft: 15
    },
    icon: {
        fontSize: 26,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

export default Main