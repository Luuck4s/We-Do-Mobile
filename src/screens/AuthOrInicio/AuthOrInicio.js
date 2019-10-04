import React, { Component } from 'react'
import Api from '../../api/Api'
import { View, ActivityIndicator, Image, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import StyleAuthOrInicio from './StyleAuthOrInicio'
import logo from '../../../assets/img/weDo_logo.png'

export default class AuthOrInicio extends Component {
    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@weDo:userData')
        const userData = JSON.parse(json) || {}

        if (userData.token) {
            Api.defaults.headers.common['Authorization'] = `${userData.token}`
            this.props.navigation.navigate('Inicio', userData.usuario)
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={StyleAuthOrInicio.container}>
                <Image source={logo} style={StyleAuthOrInicio.logo} />
                <ActivityIndicator size='large' color={'#FFF'} />
            </View>
        )
    }
}