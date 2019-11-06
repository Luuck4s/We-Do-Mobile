import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { View, Text, FlatList, ScrollView } from 'react-native'
import StylePerfilUsuario from './StylePerfilUsuario'
import Icon from 'react-native-vector-icons/FontAwesome5'
import InformacoesUsuario from '../../components/InformacoesUsuario/InformacoesUsuario'
import Portfolio from '../../components/Portifolio/Portfolio'
import ProjetosAtuais from '../../components/ProjetosAtuais/ProjetosAtuais'

ideias = [
    {
        "id_ideia": 1,
        "nm_ideia": "Sistema de Gerenciamento Escolar (SGE)"
    },
    {
        "id_ideia": 2,
        "nm_ideia": "Sistema de Gerenciamento Escolar (SGE)"
    },
    {
        "id_ideia": 3,
        "nm_ideia": "Sistema de Gerenciamento Escolar (SGE)"
    }
]
export default class PerfilUsuario extends Component {

    state = {
        idUsuario: null,
    }

    componentDidMount() {
        let idUsuario = this.props.navigation.getParam('idPerfilUsuario')

        this.setState({ idUsuario })
    }

    componentDidUpdate(PrevProps, PrevState) {
        if (this.props.navigation.getParam('idPerfilUsuario') != this.state.idUsuario) {
            let idUsuario = this.props.navigation.getParam('idPerfilUsuario')
            this.setState({ idUsuario })
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={StylePerfilUsuario.container}>
                    <Header icon={"arrow-left"} onPress={() => this.props.navigation.openDrawer()} />

                    <View style={StylePerfilUsuario.informacaoArea}>
                        <Icon name={"user-ninja"} size={40} style={StylePerfilUsuario.iconUser} />
                        <Text style={StylePerfilUsuario.nmUsuario}>Nome usuario</Text>
                    </View>

                    <InformacoesUsuario perfilUsuario descricao={"A vida é bela demais para vivermos a tarde dashjdh"} email={"lucas196078@gmail.com"} />

                    <Text style={StylePerfilUsuario.text}>Portfólio</Text>
                    <Text style={StylePerfilUsuario.subText}>Projetos já concluídos.</Text>

                    <Portfolio ideias={ideias} />

                    <Text style={StylePerfilUsuario.text}>Projetos Atuais</Text>
                    <Text style={StylePerfilUsuario.subText}>Projetos em andamento.</Text>
                    
                    <ProjetosAtuais ideias={ideias} />
                </View>
            </ScrollView>
        )
    }
}