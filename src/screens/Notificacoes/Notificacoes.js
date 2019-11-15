import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Header from '../../components/Header/Header'
import AsyncStorage from '@react-native-community/async-storage'
import Notificacao from '../../components/Notificacao/Notificacao'

export default class Notificacoes extends Component {

    constructor(props) {
        super(props)
    }

    state = {

    }

    render() {
        return (
            <View>
                <Header paginaInicial={false} texto={"Notificações"} icon={"medapps"} onPress={() => this.props.navigation.openDrawer()} />
                <ScrollView>
                    <Notificacao tp_notificacao={1} msg_notificacao={"Lucas Lima  curtiu uma ideia na qual vc é idealizador "} id_ideia={11} momento_notificacao={"2019-11-15T19:11:56.000Z"} />
                    <Notificacao tp_notificacao={2} msg_notificacao={"Lucas Lima comentou em uma ideia na qual vc é idealizador"} id_ideia={5} momento_notificacao={"2019-11-15T19:11:35.000Z"} />
                    <Notificacao msg_notificacao={"Lucas Lima se interessou em uma ideia na qual vc é idealizador"} id_ideia={1} momento_notificacao={"2019-11-15T19:11:35.000Z"} />
                    <Notificacao tp_notificacao={1} msg_notificacao={"Lucas Lima  curtiu uma ideia na qual vc é idealizador "} id_ideia={11} momento_notificacao={"2019-11-15T19:11:56.000Z"} />
                    <Notificacao tp_notificacao={2} msg_notificacao={"Lucas Lima comentou em uma ideia na qual vc é idealizador"} id_ideia={5} momento_notificacao={"2019-11-15T19:11:35.000Z"} />
                    <Notificacao msg_notificacao={"Lucas Lima se interessou em uma ideia na qual vc é idealizador"} id_ideia={1} momento_notificacao={"2019-11-15T19:11:35.000Z"} />
                    <Notificacao tp_notificacao={1} msg_notificacao={"Lucas Lima  curtiu uma ideia na qual vc é idealizador "} id_ideia={11} momento_notificacao={"2019-11-15T19:11:56.000Z"} />
                    <Notificacao tp_notificacao={2} msg_notificacao={"Lucas Lima comentou em uma ideia na qual vc é idealizador"} id_ideia={5} momento_notificacao={"2019-11-15T19:11:35.000Z"} />
                    <Notificacao msg_notificacao={"Lucas Lima se interessou em uma ideia na qual vc é idealizador"} id_ideia={1} momento_notificacao={"2019-11-15T19:11:35.000Z"} />
                </ScrollView>
            </View>
        )
    }
}