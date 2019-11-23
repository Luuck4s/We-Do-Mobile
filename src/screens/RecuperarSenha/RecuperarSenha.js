import React, { Component } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, Alert } from 'react-native'
import StyleRecuperarSenha from './StyleRecuperarSenha'
import Icon from 'react-native-vector-icons/FontAwesome5'
import logo from '../../../assets/img/weDo_logo.png'
import AuthInput from '../../components/AuthInput/AuthInput'
import Api from '../../api/Api'

var emailInvalido = false

export default class RecuperarSenha extends Component {


    state = {
        email_usuario: ''
    }

    recuperarSenha = async () => {
        await Api.post(`/usuario/recuperar_senha`, {
            usuario: {
                email_usuario: this.state.email_usuario
            }
        }).then((response) => {
            if (response.data.err) {
                Alert.alert(`Houve um erro`, `${response.data.err}`)
            } else {
                Alert.alert(`Confirmação`, `${response.data.msg}`)
                this.props.navigation.navigate('Auth')
            }
        })
    }

    render() {
        const validacao = []

        if (this.state.email_usuario && !(this.state.email_usuario.includes('@') && this.state.email_usuario.includes('.com'))) {
            emailInvalido = true
        } else {
            emailInvalido = false
        }

        validacao.push(this.state.email_usuario && this.state.email_usuario.includes('@') && this.state.email_usuario.includes('.com'))
        const validaFormulario = validacao.reduce((all, v) => all && v)

        return (
            <View style={StyleRecuperarSenha.container}>
                <View style={StyleRecuperarSenha.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}>
                        <Icon name={'arrow-left'} size={25} style={StyleRecuperarSenha.icon} />
                    </TouchableOpacity>
                    <Text style={StyleRecuperarSenha.title}>Recuperar Senha</Text>
                </View>
                <Image source={logo} style={StyleRecuperarSenha.logo} />
                <View style={StyleRecuperarSenha.formContainer}>
                    <AuthInput style={[StyleRecuperarSenha.input , emailInvalido ? { borderColor: '#F00', borderWidth: 1.4 } : null]}
                        icon='envelope'
                        autoFocus={false}
                        keyboardType={'email-address'}
                        placeholder='Email'
                        maxLength={80}
                        value={this.state.email_usuario}
                        onChangeText={email_usuario => this.setState({ email_usuario })} />
                    <View style={StyleRecuperarSenha.containerBotao}>
                        <TouchableOpacity disabled={!validaFormulario} onPress={this.recuperarSenha} >
                            <View style={[StyleRecuperarSenha.botao, !validaFormulario ? { backgroundColor: '#AAA' } : {}]}>
                                <Text style={StyleRecuperarSenha.textButton}>
                                    Pronto
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}