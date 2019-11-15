import React, { Component } from 'react'
import { View, ScrollView, FlatList, RefreshControl, Text } from 'react-native'
import Header from '../../components/Header/Header'
import IdeiaChat from '../../components/IdeiaChat/IdeiaChat'
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage'
import StyleProjetos from './StyleProjetos'

export default class Projetos extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: '',
        ideias: [],
        carregando: true,
        atualizando: false,
        semChat: false,
    }

    componentDidMount = async () => {
        let idUser = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario: idUser })

        await this.buscarProjetosAtuais()
    }

    buscarProjetosAtuais = async () => {
        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {

            if (response.data.ideias == undefined) {
                this.setState({ ideias: [], semChat: true})
            } else {
                this.setState({ ideias: response.data.ideias })
            }
            this.setState({ carregando: false })
        })
    }

    mudarPagina = (idIdeia, nmIdeia) => {

        let id = {
            "idIdeiaChat": idIdeia,
            "nmIdeiaChat": nmIdeia
        }

        this.props.navigation.navigate("Chat", id)
    }

    atualizarProjetos = async () => {

        this.setState({ atualizando: true, ideias: [], semChat: false })

        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == undefined) {
                this.setState({ ideias: [], semChat: true})
            } else {
                this.setState({ ideias: response.data.ideias })
            }
            this.setState({ carregando: false })
        })

        this.setState({ atualizando: false })
    }



    render() {

        renderItem = ({ item }) => (<IdeiaChat {...item} onPress={() => this.mudarPagina(item.id_ideia, item.nm_ideia)} />)

        return (
            <View>
                <Header paginaInicial={false} texto={"Chat"} icon={"comment-alt"} onPress={() => this.props.navigation.openDrawer()} />
                <ScrollView refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarProjetos()} />}>
                    {this.state.semChat &&
                        <Text style={StyleProjetos.textNoIdeias}>Você não participa de nenhuma ideia para ter chats.</Text>
                    }
                    <FlatList
                        initialNumToRender={3}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                </ScrollView>
            </View>

        )
    }
}