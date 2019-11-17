import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, RefreshControl, Alert, ToastAndroid} from 'react-native'
import Header from '../../components/Header/Header'
import AsyncStorage from '@react-native-community/async-storage'
import Notificacao from '../../components/Notificacao/Notificacao'
import Api from '../../api/Api'
import StyleNotificacoes from './StyleNotificacoes'
import io from 'socket.io-client'

var socket

export default class Notificacoes extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: '',
        notificacoes: [],
        semNotificacoes: false,
        atualizando: false,
        carregando: true,
        numNotificacoes: 0,
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })

        await Api.put(`/notificacoes/${this.state.idUsuario}`).then((response) => {})
        
        await this.pegarNotificacoes()

        socket = io.connect('http://10.0.2.2:8080/')
        
    }

    pegarNotificacoes = async () => {

        await Api.get(`/notificacoes/${this.state.idUsuario}`).then((response) => {
            if (response.data.notificacoes == "") {
                this.setState({ notificacoes: [], semNotificacoes: true })
            } else {
                this.setState({ notificacoes: response.data.notificacoes })
            }

            this.setState({ carregando: false })
        })
    }

    atualizarNotificacoes = async () => {
        
        this.setState({ notificacoes: [], atualizando: true, semNotificacoes: false })

        await Api.get(`/notificacoes/${this.state.idUsuario}`).then((response) => {
            if (response.data.notificacoes == "") {
                this.setState({ notificacoes: [], semNotificacoes: true })
            } else {
                this.setState({ notificacoes: response.data.notificacoes })
            }

            this.setState({ carregando: false, atualizando: false })
        })

        await Api.put(`/notificacoes/${this.state.idUsuario}`).then((response) => {})
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

    mostrarPerfil = (data) => {
        let idCriador = 0

        idCriador = {
            "idPerfilUsuario": data,
            "paginaAnterior": "Notificacao"
        }

        this.props.navigation.navigate('PerfilUsuario', idCriador)
    }

    aceitar = async (data) => {
        await Api.put(`/ideia/interesse`,{
            ideia:{
                id_usuario: this.state.idUsuario,
                id_ideia: data[1]
            },
            usuario:{
                id_usuario: data[0]
            }
        }).then((response) =>{
            ToastAndroid.show('Usuário aceito na ideia.', ToastAndroid.SHORT);
        })

        await this.atualizarNotificacoes()
    }

    recusar = async (data) => {
        await Api.put(`/ideia/interesse`,{
            ideia:{
                id_usuario: this.state.idUsuario,
                id_ideia: data[1]
            },
            usuario:{
                id_usuario: data[0]
            }
        }).then((response) =>{
            ToastAndroid.show('Usuário recusado na ideia.', ToastAndroid.SHORT);
        })

        await this.atualizarNotificacoes()
    }

    render() {

        renderItem = ({ item }) => {

            return <Notificacao key={item.id_evento} ideia={data => this.ideia(item.id_ideia)} 
            mostrarPefil={data => this.mostrarPerfil(data)} aceitar={data => this.aceitar(data)} recusar={data => this.recusar(data)} {...item} />
        }

        return (
            <View>
                <Header paginaInicial={false} texto={"Notificações"} icon={"medapps"} onPress={() => this.props.navigation.openDrawer()} />
                {this.state.semNotificacoes &&
                    <Text style={StyleNotificacoes.textNoIdeias}>Você não tem nenhuma notificação.</Text>
                }
                <FlatList
                    refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarNotificacoes()} />}
                    initialNumToRender={5}
                    data={this.state.notificacoes}
                    style={{ width: '100%', height: '90%' }}
                    keyExtractor={item => `${item.id_evento}`}
                    renderItem={renderItem} />
            </View>
        )
    }
}