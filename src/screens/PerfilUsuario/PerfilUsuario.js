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

tecnologias = [
    {
        "id_tecnologia": 8,
        "nm_tecnologia": "JavaScript"
    },
    {
        "id_tecnologia": 13,
        "nm_tecnologia": "PHP"
    },
    {
        "id_tecnologia": 16,
        "nm_tecnologia": "SQL"
    },
    {
        "id_tecnologia": 81,
        "nm_tecnologia": "JavaScript"
    },
    {
        "id_tecnologia": 131,
        "nm_tecnologia": "PHP"
    },
    {
        "id_tecnologia": 161,
        "nm_tecnologia": "SQL"
    }
]
export default class PerfilUsuario extends Component {

    state = {
        idUsuario: null,
        pageAnterior: ''
    }

    componentDidMount() {
        let idUsuario = this.props.navigation.getParam('idPerfilUsuario')
        let pageAnterior = this.props.navigation.getParam('paginaAnterior')

        this.setState({ idUsuario, pageAnterior })
    }

    componentDidUpdate(PrevProps, PrevState) {
        if ((this.props.navigation.getParam('idPerfilUsuario') != this.state.idUsuario) || 
            (this.props.navigation.getParam('paginaAnterior') != PrevProps.navigation.getParam('paginaAnterior'))) {

            let idUsuario = this.props.navigation.getParam('idPerfilUsuario')
            let pageAnterior = this.props.navigation.getParam('paginaAnterior')

            this.setState({ idUsuario, pageAnterior })
        }
    }

    /**
     *  Função que volta para a pagina que o usuario estava 
    */
    voltarPagina = () => {
        if(this.state.pageAnterior == 'Trends'){
            this.props.navigation.goBack()    
        }else{
            this.props.navigation.navigate(this.state.pageAnterior)
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={StylePerfilUsuario.container}>
                    <Header icon={"arrow-left"} onPress={() => this.voltarPagina()} />
                    <View style={StylePerfilUsuario.informacaoArea}>
                        <Icon name={"user-ninja"} size={40} style={StylePerfilUsuario.iconUser} />
                        <Text style={StylePerfilUsuario.nmUsuario}>Nome usuario</Text>
                    </View>

                    <InformacoesUsuario perfilUsuario tecnologias={tecnologias} descricao={"A vida é bela demais para vivermos a tarde dashjdh"} email={"lucas196078@gmail.com"} />

                    <Text style={StylePerfilUsuario.text}>Portfólio</Text>
                    <Text style={StylePerfilUsuario.subText}>Projetos já concluídos.</Text>

                    <Portfolio ideias={ideias} />

                </View>
            </ScrollView>
        )
    }
}