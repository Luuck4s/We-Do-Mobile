import React, { Component } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, Alert } from 'react-native'
import StyleRecuperarSenha from './StyleRecuperarSenha'
import Icon from 'react-native-vector-icons/FontAwesome5'
import logo from '../../../assets/img/weDo_logo.png'
import AuthInput from '../../components/AuthInput/AuthInput'
import Api from '../../api/Api'

export default class RecuperarSenha extends Component {


    state = {
        email_usuario: ''
    }

    recuperarSenha = async () => {
        await Api.get(`/usuario/recuperar_senha`, {
            data: {
                usuario: {
                    email_usuario: this.state.email_usuario
                }
            }
        }).then((response) =>{
            if(response.msg){
                Alert.alert(`Confirmação`,`${response.msg}`)
            }else{
                Alert.alert(`Confirmação`,`${response.msg}`)
            }
        })
    }

    render() {
        const validacao = []

        validacao.push(this.state.email_usuario && this.state.email_usuario.includes('@'))
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
                    <AuthInput style={StyleRecuperarSenha.input}
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