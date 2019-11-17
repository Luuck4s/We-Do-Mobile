import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { View, Text, FlatList, ScrollView } from 'react-native'
import StylePerfilUsuario from './StylePerfilUsuario'
import Icon from 'react-native-vector-icons/FontAwesome5'
import InformacoesUsuario from '../../components/InformacoesUsuario/InformacoesUsuario'
import ComponentPortfolio from '../../components/ComponentPortifolio/ComponentPortfolio'
import ComponentProjetosAtuais from '../../components/ComponentProjetosAtuais/ComponentProjetosAtuais'
import Api from '../../api/Api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

export default class PerfilUsuario extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: '',
        pageAnterior: '',
        emailUsuario: null,
        tecnologias: [],
        dsBio: null,
        nmUsuario: null,
        portfolio: [],
        projetosAtuais: [],
        idUsuarioLogado: ''
    }

    componentDidMount = async () => {
        let idUsuarioLogado = await AsyncStorage.getItem('@weDo:userId')
        let idUser = await this.props.navigation.getParam('idPerfilUsuario')
        let pageAnterior = await this.props.navigation.getParam('paginaAnterior')

        this.setState({ idUsuario: idUser, pageAnterior, idUsuarioLogado })

        await this.buscarInformacoesUsuario()
    }

    componentDidUpdate = async (PrevProps, PrevState) => {
        if ((this.props.navigation.getParam('idPerfilUsuario') != this.state.idUsuario) ||
            (this.props.navigation.getParam('paginaAnterior') != PrevProps.navigation.getParam('paginaAnterior'))) {
            let idUsuarioLogado = await AsyncStorage.getItem('@weDo:userId')
            let idUser = await this.props.navigation.getParam('idPerfilUsuario')
            let pageAnterior = await this.props.navigation.getParam('paginaAnterior')

            this.setState({ idUsuario: idUser, pageAnterior, idUsuarioLogado })

            await this.buscarInformacoesUsuario()
        }
    }

    buscarInformacoesUsuario = async () => {
        await Api.get(`/usuario/perfil/${this.state.idUsuario}&${this.state.idUsuario}`).then((response) => {

            this.setState(
                {
                    emailUsuario: response.data.perfil_usuario.email_usuario,
                    tecnologias: response.data.perfil_usuario.tecnologias,
                    dsBio: response.data.perfil_usuario.ds_bio ? response.data.perfil_usuario.ds_bio : 'Sem descrição',
                    nmUsuario: response.data.perfil_usuario.nm_usuario
                }
            )
        })

        await this.buscarProjetosEPort()
    }

    buscarProjetosEPort = async () => {
        await Api.get(`/ideia/portifolio/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == "") {
                this.setState({ Semportfolio: true, portfolio: [] })
            } else {
                this.setState({ portfolio: response.data.ideias })
            }
        })

        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == null) {
                this.setState({ semProjetosAtuais: true, projetosAtuais: [] })
            } else {
                this.setState({ projetosAtuais: response.data.ideias })
            }

            this.setState({ carregando: false })
        })
    }

    ideia = (idIdeia) => {
        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario,
            paginaAnteriorIdeia: "PerfilUsuario"
        })

        this.props.navigation.navigate('IdeiaPage', data)

    }


    /**
     *  Função que volta para a pagina que o usuario estava 
    */
    voltarPagina = () => {
        if (this.state.pageAnterior == 'Trends') {
            this.props.navigation.goBack()
        } else {
            this.props.navigation.navigate(this.state.pageAnterior)
        }
    }

    render() {
        renderItemPort = ({ item }) => {

            return <ComponentPortfolio key={item.id_ideia} ideia={data => this.ideia(data)}  {...item} />
        }

        renderItemProj = ({ item }) => {

            return <ComponentProjetosAtuais key={item.id_ideia} ideia={data => this.ideia(data)} {...item} />
        }

        return (
            <View>
                <Header icon={"arrow-left"} onPress={() => this.voltarPagina()} />
                <ScrollView style={{height: '92%'}}>
                    <View style={StylePerfilUsuario.container}>
                        <View style={StylePerfilUsuario.informacaoArea}>
                            <Icon name={"user-ninja"} size={40} style={StylePerfilUsuario.iconUser} />
                            <Text style={StylePerfilUsuario.nmUsuario}>{this.state.nmUsuario}</Text>
                        </View>
                        <InformacoesUsuario perfilUsuario tecnologias={this.state.tecnologias} descricao={this.state.dsBio} email={this.state.emailUsuario} />
                        {this.state.idUsuario != this.state.idUsuarioLogado &&
                            <TouchableOpacity onPress={() => alert(this.state.idUsuario)}>
                                <Icon name={"exclamation-circle"} size={25} style={StylePerfilUsuario.iconDenuncia} />
                            </TouchableOpacity>
                        }
                        <Text style={StylePerfilUsuario.text}>Portfólio</Text>
                        <Text style={StylePerfilUsuario.subText}>Projetos já concluídos.</Text>
                        {this.state.Semportfolio &&
                            <Text style={StylePerfilUsuario.textNoIdeias}>{this.state.nmUsuario} não concluiu nenhum projeto.</Text>
                        }
                        <FlatList
                            initialNumToRender={3}
                            data={this.state.portfolio}
                            keyExtractor={item => `${item.id_ideia}`}
                            renderItem={renderItemPort}
                        />

                        <Text style={StylePerfilUsuario.text}>Projetos Atuais</Text>
                        <Text style={StylePerfilUsuario.subText}>Projetos em andamento.</Text>
                        {this.state.semProjetosAtuais &&
                            <Text style={StylePerfilUsuario.textNoIdeias}>{this.state.nmUsuario} não participa de nenhum projeto.</Text>
                        }
                        <FlatList
                            initialNumToRender={3}
                            data={this.state.projetosAtuais}
                            keyExtractor={item => `${item.id_ideia}`}
                            renderItem={renderItemProj} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}