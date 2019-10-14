import React, { Component } from 'react'
import Api from '../../api/Api'
import { View, ActivityIndicator, Image, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import StyleAuthOrInicio from './StyleAuthOrInicio'
import logo from '../../../assets/img/weDo_logo.png'
import NetInfo from "@react-native-community/netinfo"

export default class AuthOrInicio extends Component {

    componentDidMount = async () => {

        let conectado = null
        let veri

        NetInfo.isConnected.fetch().done((isConnected) => { 
            if(isConnected == true){
                conectado = {"conectado":"true"}
                veri = true
            }else{
                conectado = {"conectado":"false"}
                veri = false
            }
        })

        const json = await AsyncStorage.getItem('@weDo:userData')
        const userData = JSON.parse(json) || {}

        if (userData.token && veri) {
            Api.defaults.headers.common['Authorization'] = `${userData.token}`
            this.props.navigation.navigate('Inicio', userData.usuario)
        } else {
            this.props.navigation.navigate('Auth',conectado)
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