import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native'
import Header from '../../components/Header/Header'
import io from 'socket.io-client'
import StyleChat from './StyleChat'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../../api/Api'

var socket

export default class Chat extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        messages: [],
        idUsuario: '',
        nm_usuario: '',
        ideiaAtual: 11,
    }

    componentDidMount = async () => {
        let idUser = await AsyncStorage.getItem('@weDo:userId')
        let nmUser = await AsyncStorage.getItem('@weDo:userName')

        this.setState({ idUsuario: idUser, nm_usuario: `${nmUser}` })

        await this.pegarMensagems()

        socket = io.connect('http://10.0.2.2:8080/')

        socket.on("chat_message", (dados) => {

            let modeloMensagem = {
                _id: Math.random(),
                text: dados.ct_mensagem,
                createdAt: new Date(),
                user: {
                    _id: `${dados.id_usuario}`,
                    name: dados.nm_usuario,
                }
            }

            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, modeloMensagem),
            }))

        })
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.navigation.getParam('idIdeiaChat') != prevProps.navigation.getParam('idIdeiaChat')) {

            let idUser = await AsyncStorage.getItem('@weDo:userId')
            let nmUser = await AsyncStorage.getItem('@weDo:userName')

            this.setState({ idUsuario: idUser, nm_usuario: `${nmUser}` })
            socket = io.connect('http://10.0.2.2:8080/')

            socket.on("chat_message", (dados) => {

                let modeloMensagem = {
                    _id: Math.random(),
                    text: dados.ct_mensagem,
                    createdAt: new Date(),
                    user: {
                        _id: `${dados.id_usuario}`,
                        name: dados.nm_usuario,
                    }
                }

                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, modeloMensagem),
                }))

            })
        }
    }

    /**
     * Pega as mensagens antigas para ja colocar no chat
    */
    pegarMensagems = async () => {
        let modeloMensagem

        //o numero 1 vai mudar o numero da ideia 
        Api.get(`/chat/${this.state.idUsuario}&${1}`).then((response) => {

            let mensagens = response.data.chat[0]

            mensagens.map((item, index) => {
                modeloMensagem = {
                    _id: item.id_mensagem,
                    text: item.ct_mensagem,
                    createdAt: item.hr_mensagem,
                    user: {
                        _id: `${item.id_usuario}`,
                        name: item.nm_usuario,
                    }
                }

                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, modeloMensagem),
                }))
            })
        })
    }


    /**
     * Envia as mensagens para o socket
    */
    enviarMensagem = async (messages = []) => {

        let dados_mensagens

        messages.map((item, index) => {

            dados_mensagens = {
                id_usuario: `${this.state.idUsuario}`,
                id_ideia: 1, // fixo para teste
                nm_usuario: this.state.nm_usuario,
                ct_mensagem: item.text
            }
        })

        socket.emit('chat_message', dados_mensagens)

    }

    voltarPagina = () => {
        this.props.navigation.goBack()
        socket.disconnect()
    }

    render() {
        return (
            <View style={StyleChat.container}>
                <Header icon={"arrow-left"} texto={"Manoteras"} onPress={() => this.voltarPagina()} />
                <GiftedChat

                    placeholder={"Escreva sua mensagem"}
                    locale={"pt-BR"}
                    messages={this.state.messages}
                    onSend={messages => this.enviarMensagem(messages)}
                    user={{
                        _id: `${this.state.idUsuario}`,
                        name: this.state.nm_usuario,
                    }}

                />
            </View>

        )
    }
}