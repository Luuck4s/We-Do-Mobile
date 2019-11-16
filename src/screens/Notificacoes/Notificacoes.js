import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native'
import Header from '../../components/Header/Header'
import AsyncStorage from '@react-native-community/async-storage'
import Notificacao from '../../components/Notificacao/Notificacao'
import Api from '../../api/Api'

export default class Notificacoes extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: '',
        notificacoes: [],
        semNotificacoes: false,
        atualizando: false,
        carregando: true
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })

        await this.pegarNotificacoes()
    }

    pegarNotificacoes = async () => {

        await Api.get(`/notificacoes/${this.state.idUsuario}`).then((response) => {
            if (response.data.notificacoes == "") {
                this.setState({ notificacoes: [], semNotificacoes: true })
            } else {
                this.setState({ notificacoes: response.data.notificacoes })
            }

            this.setState({carregando: false})
        })
    }

    atualizarNotificacoes = async () => {
        this.setState({notificacoes: [], atualizando: true})
        await Api.get(`/notificacoes/${this.state.idUsuario}`).then((response) => {
            if (response.data.notificacoes == "") {
                this.setState({ notificacoes: [], semNotificacoes: true })
            } else {
                this.setState({ notificacoes: response.data.notificacoes })
            }

            this.setState({carregando: false, atualizando: false})
        })
    }

    ideia = (idIdeia) => {

        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario,
            paginaAnteriorIdeia: "Notificacao"
        })

        this.props.navigation.navigate('IdeiaPage', data)
    }

    render() {

        renderItem = ({ item }) => {

            return <Notificacao key={item.id_evento} ideia={data => this.ideia(item.id_ideia)} {...item} />
        }

        return (
            <View>
                <Header paginaInicial={false} texto={"Notificações"} icon={"medapps"} onPress={() => this.props.navigation.openDrawer()} />
                <FlatList
                    refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarNotificacoes()} />}
                    initialNumToRender={5}
                    data={this.state.notificacoes}
                    keyExtractor={item => `${item.id_evento}`}
                    renderItem={renderItem} />
            </View>
        )
    }
}