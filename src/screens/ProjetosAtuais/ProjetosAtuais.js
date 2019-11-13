import React, { Component } from 'react'
import { View, Text, ScrollView, Alert, FlatList, RefreshControl } from 'react-native'
import Header from '../../components/Header/Header'
import ComponentProjetosAtuais from '../../components/ComponentProjetosAtuais/ComponentProjetosAtuais'
import StyleProjetosAtuais from './StyleProjetosAtuais'
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage'

export default class ProjetosAtuais extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: '',
        ideias: [],
        carregando: true,
        atualizando: false,
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })


        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            this.setState({ ideias: response.data.ideias, carregando: false })
        })
    }

    atualizarProjetos = async () => {
        this.setState({ atualizando: true, ideias: [] })

        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            this.setState({ ideias: response.data.ideias, carregando: false, atualizando: false })
        })
    }

    ideia = (idIdeia) => {
        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario,
            paginaAnteriorIdeia: "ProjetosAtuais"
        })

        this.props.navigation.navigate('IdeiaPage', data)

    }

    render() {
        renderItem = ({ item }) => {

            return <ComponentProjetosAtuais key={item.id_ideia} ideia={data => this.ideia(data)} {...item} />
        }
        return (
            <ScrollView>
                <View>
                    <Header paginaInicial={false} texto={"Projetos Atuais"} icon={"code"} onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={StyleProjetosAtuais.text}>Projetos Atuais</Text>
                    <Text style={StyleProjetosAtuais.subText}>Projetos em andamento.</Text>
                    <FlatList
                        refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarProjetos()} />}
                        initialNumToRender={3}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                </View>
            </ScrollView>
        )
    }
}

/**
 *
 */