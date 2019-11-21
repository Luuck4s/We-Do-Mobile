import React, { Component } from 'react'
import { Avatar, Badge, withBadge } from 'react-native-elements'
import { View, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from './api/Api'
import socket from './socket/socket'

export default class BottomNotification extends Component {

    state = {
        idUsuario: '',
        numNotificacao: '',
    }

    componentDidMount = async () => {

        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })

        socket.on("notification", (dados) => {
            if(dados != null){
                if(dados.id_usuario != undefined){
                    if (dados.id_usuario == this.state.idUsuario) {
                        this.setState({ numNotificacao: this.state.numNotificacao + 1 })
                    }
                }   
            }
        })

        this.pegarNotiticacoes()
    }

    componentDidUpdate = async (PrevProps, PrevState) => {
        let numNoti = 0

        await Api.get(`/notificacoes/${this.state.idUsuario}`).then((response) => {
            let data = response.data.notificacoes
            data.map((item, index) => {
                if (item.visualizada == 0) {
                    numNoti++
                }
            })
        })

        if (numNoti != this.state.numNotificacao) {
            this.setState({ numNotificacao: numNoti })
        }

    }

    pegarNotiticacoes = async () => {

        let numNoti = 0

        await Api.get(`/notificacoes/${this.state.idUsuario}`).then((response) => {
            let data = response.data.notificacoes
            data.map((item, index) => {
                if (item.visualizada == 0) {
                    numNoti++
                }
            })
        })

        this.setState({ numNotificacao: numNoti })
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Icon name='medapps' size={30} color={this.props.color} />
                {!this.state.numNotificacao == 0 &&
                    <Badge value={this.state.numNotificacao} status="error" />
                }
            </View>
        )
    }
}