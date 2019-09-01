import React, { Component } from 'react'
import Api from '../api/Api'
import EstiloComum from '../EstiloComum'
import { View, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import logo from '../../assets/img/weDo_logo.png'

export default class AuthOrInicio extends Component {
    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@weDo:userData')
        const userData = JSON.parse(json) || {}

        if (userData.token) {
            Api.defaults.headers.common['Authorization'] = `${userData.token}`
            this.props.navigation.navigate('Inicio')
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <ActivityIndicator size='large' color={'#FFF'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: EstiloComum.cores.fundoWeDo
    },
    logo: {
        marginTop: 20,
		width: '45%',
		height: '35%',
		resizeMode: 'contain',
    }
})