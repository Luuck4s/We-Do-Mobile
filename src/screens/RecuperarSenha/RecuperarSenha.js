import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import StyleRecuperarSenha from './StyleRecuperarSenha'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class RecuperarSenha extends Component {
    render() {
        return (
            <View style={StyleRecuperarSenha.container}>
                <View style={StyleRecuperarSenha.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}>
                        <Icon name={'arrow-left'} size={25} style={StyleRecuperarSenha.icon} />
                    </TouchableOpacity>
                    <Text style={StyleRecuperarSenha.title}>Recuperar Senha</Text>
                </View>
            </View>
        )
    }
}