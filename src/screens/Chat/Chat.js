import React, { Component } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native'
import Header from '../../components/Header/Header'
import io from 'socket.io-client'
import StyleChat from './StyleChat'
import { GiftedChat, InputToolbar, Bubble, Send, Time } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../../api/Api'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Icon from 'react-native-vector-icons'
import moment from 'moment'
import 'moment/locale/pt-br'

var socket

export default class Chat extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        messages: [],
        idUsuario: '',
        nm_usuario: '',
        ideiaAtual: '',
        nmIdeia: '',
        carregando: true,
    }

    componentDidMount = async () => {
        let idUser = await AsyncStorage.getItem('@weDo:userId')
        let nmUser = await AsyncStorage.getItem('@weDo:userName')
        let ideiaAtual = this.props.navigation.getParam("idIdeiaChat")
        let nmIdeia = this.props.navigation.getParam("nmIdeiaChat")

        nmUser = nmUser.replace(/[\\"]/g, '')

        this.setState({ idUsuario: idUser, nm_usuario: nmUser, ideiaAtual, nmIdeia })

        await this.pegarMensagems()

        socket = io.connect('http://10.0.2.2:8080/', {
            timeout: 10000,
        })

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
            let ideiaAtual = this.props.navigation.getParam("idIdeiaChat")
            let nmIdeia = this.props.navigation.getParam("nmIdeiaChat")

            nmUser = nmUser.replace(/[\\"]/g, '')

            this.setState({ idUsuario: idUser, nm_usuario: nmUser, ideiaAtual, nmIdeia })

            socket = io.connect('http://10.0.2.2:8080/', {
                timeout: 10000,
            })

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

    componentWillUnmount() {
        socket.disconnect()
    }

    /**
     * Pega as mensagens antigas para ja colocar no chat
    */
    pegarMensagems = async () => {
        let modeloMensagem

        Api.get(`/chat/${this.state.idUsuario}&${this.state.ideiaAtual}`).then((response) => {

            let mensagens = response.data.chat[0]

            mensagens.map((item, index) => {
                modeloMensagem = {
                    _id: item.id_mensagem,
                    text: item.ct_mensagem,
                    createdAt: moment(item.hr_mensagem, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'),
                    user: {
                        _id: `${item.id_usuario}`,
                        name: item.nm_usuario,
                    }
                }

                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, modeloMensagem),
                }))

                this.setState({ carregando: false })
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
                id_ideia: this.state.ideiaAtual,
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

    renderSend(props) {
        return (
            <Send {...props} >
                <View style={{ marginRight: 10, marginBottom: 10 }}>
                    <Image source={require('../../../assets/img/send.png')} resizeMode='contain' />
                </View>
            </Send>
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        
                    }
                }}
            />
        );
    }

    renderMessage = props => {

    }

    render() {
        return (
            <View style={StyleChat.container}>
                <Header icon={"arrow-left"} styleTexto={StyleChat.texto} texto={this.state.nmIdeia} onPress={() => this.voltarPagina()} />
                {this.state.carregando &&
                    <View style={StyleChat.viewCarregando}>
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemDireita} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemDireita} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />

                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemDireita} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemDireita} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />

                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemDireita} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemDireita} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleChat.shimmerMensagemEsquerda} />
                    </View>
                }
                {!this.state.carregando &&
                    <GiftedChat
                        placeholder={"Escreva sua mensagem"}
                        scrollToBottom
                        messages={this.state.messages}
                        onSend={messages => this.enviarMensagem(messages)}
                        showUserAvatar={true}
                        dateFormat={"DD [de] MMMM, YYYY"}
                        timeFormat={"hh:mm"}
                        renderSend={this.renderSend}
                        renderBubble={this.renderBubble}
                        user={{
                            _id: `${this.state.idUsuario}`,
                            name: this.state.nm_usuario,
                        }}

                    />

                }

            </View>

        )
    }
}