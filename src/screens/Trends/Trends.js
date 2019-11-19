import React, { Component } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import Header from '../../components/Header/Header'
import StyleTrends from './StyleTrends'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'
import AsyncStorage from '@react-native-community/async-storage'
import io from 'socket.io-client'

var socket

export default class Trends extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        ideias: [],
        atualizando: false,
        idUsuario: ''
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')
        this.setState({ idUsuario })

        socket = io.connect('http://10.0.2.2:8080/')

        await this.buscarTrends()
    }

    buscarTrends = async () => {
        await Api.get('/trends').then((response) => {

            let ideiaArr = []
            ideiaArr.push(response.data.ideia1)
            ideiaArr.push(response.data.ideia2)
            ideiaArr.push(response.data.ideia3)

            this.setState(
                {
                    ideias: ideiaArr,
                }
            )
        })

    }

    /**
     * Mostra interesse na ideia
     * @param - idIdeia 
    */
    interesse = async (idIdeia) => {
        await Api.post('/interesse', {
            usuario: {
                id_usuario: this.state.idUsuario,
            },
            ideia: {
                id_ideia: idIdeia
            }
        }).then((response) => {

            let dados_notificacao = {
                id_usuario: this.state.idUsuario,
                id_ideia: idIdeia,
                acao: 3
            }
            socket.emit('notification', dados_notificacao)
        })
    }

    /**
     * Curtir ideia
     * @param - IdIdeia
     */
    curtirIdeia = async (idIdeia) => {
        await Api.post('/curtida', {
            usuario: {
                id_usuario: this.state.idUsuario
            },
            ideia: {
                id_ideia: idIdeia
            }
        }).then((response) => {

            let dados_notificacao = {
                id_usuario: this.state.idUsuario,
                id_ideia: idIdeia,
                acao: 1
            }
            socket.emit('notification', dados_notificacao)
        })
    }

    /**
     * Mostrar informações sobre o autor indo para pagina do usuario 
     * @param - Membros 
     */
    infoAutor = (Membros) => {
        let idCriador = 0
        let veri
        Membros.map((item, index) => {
            if (item.idealizador == 1) {
                veri = item.id_usuario
                idCriador = { "idPerfilUsuario": item.id_usuario, "paginaAnterior": "Trends" }
            }
        })

        if (veri == this.state.idUsuario) {
            this.props.navigation.navigate('Perfil')
        } else {
            this.props.navigation.navigate('PerfilUsuario', idCriador)
        }
    }

    /**
    * Comentarios da ideia
    * @param - IdIdeia
    */
    comentarios = (idIdeia) => {
        this.ideia(idIdeia)
    }

    /**
     * Membros da ideia
     * @param - IdIdeia
    */
    membros = (idIdeia) => {
        this.ideia(idIdeia)
    }

    /**
     * Função para atualizar o trends
    */
    atualizaTrends = async () => {

        this.setState({ ideias: [], atualizando: true })

        await Api.get('/trends').then((response) => {

            let ideiaArr = []
            ideiaArr.push(response.data.ideia1)
            ideiaArr.push(response.data.ideia2)
            ideiaArr.push(response.data.ideia3)

            this.setState(
                {
                    ideias: ideiaArr,
                    atualizando: false
                }
            )
        })
    }

    /**
     * Ideia em si
     * @param - IdIdeia
    */
    ideia = (idIdeia) => {

        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario,
        })

        this.props.navigation.navigate('IdeiaPage', data)
    }

    render() {
        renderItem = ({ item, index }) => (<Ideia trends={true}
            posicaoIdeia={index}
            onPressAutor={() => this.infoAutor(item.membros)}
            onPresNomeIdeia={() => this.ideia(item.id_ideia)}
            onPressMembros={() => this.membros(item.id_ideia)}
            onPressCurtir={() => this.curtirIdeia(item.id_ideia)}
            onPressComentario={() => this.comentarios(item.id_ideia)}
            onPressInteresse={() => this.interesse(item.id_ideia)}
            adicionarComentario={data => this.adicionarComentario(data, item.id_ideia)}
            {...item} />)

        return (
            <View style={StyleTrends.container}>
                <Header paginaInicial={false} texto={"Trends Ideias"} icon={"crown"} onPress={() => this.props.navigation.openDrawer()} />
                {this.state.ideias &&
                    <FlatList
                        refreshControl={<RefreshControl refreshing={this.state.atualizando} onRefresh={this.atualizaTrends} />}
                        initialNumToRender={3}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                }
            </View>
        )
    }
}