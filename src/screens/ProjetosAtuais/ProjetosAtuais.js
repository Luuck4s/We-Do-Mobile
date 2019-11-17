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
        semProjetosAtuais: false
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })


        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == null) {
                this.setState({ semProjetosAtuais: true, ideias: [] })
            } else {
                this.setState({ ideias: response.data.ideias })
            }
            this.setState({ carregando: false, atualizando: false })
        })
    }

    atualizarProjetos = async () => {
        this.setState({ atualizando: true, ideias: [], semProjetosAtuais: false })

        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == null) {
                this.setState({ semProjetosAtuais: true, ideias: [] })
            } else {
                this.setState({ ideias: response.data.ideias })
            }
            this.setState({ carregando: false, atualizando: false })
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
            <View>
                <Header paginaInicial={false} texto={"Projetos Atuais"} icon={"code"} onPress={() => this.props.navigation.openDrawer()} />
                <ScrollView  refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarProjetos()} />}>
                    <View>
                        <Text style={StyleProjetosAtuais.text}>Projetos Atuais</Text>
                        <Text style={StyleProjetosAtuais.subText}>Projetos em andamento.</Text>
                        {this.state.semProjetosAtuais &&
                            <Text style={StyleProjetosAtuais.textNoIdeias}>Você não participa de nenhum projeto.</Text>
                        }
                        <FlatList
                            initialNumToRender={3}
                            data={this.state.ideias}
                            keyExtractor={item => `${item.id_ideia}`}
                            renderItem={renderItem} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

/**
 *
 */