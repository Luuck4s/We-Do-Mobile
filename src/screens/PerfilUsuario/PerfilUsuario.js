import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { View, Text } from 'react-native'
import StylePerfilUsuario from './StylePerfilUsuario'
import Icon from 'react-native-vector-icons/FontAwesome5'
import InformacoesUsuario from '../../components/InformacoesUsuario/InformacoesUsuario'

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
            <View>
                <Header icon={"bars"} onPress={() => this.props.navigation.openDrawer()} />
                <View style={StylePerfilUsuario.informacaoArea}>
                    <Icon name={"user-ninja"} size={40} style={StylePerfilUsuario.iconUser} />
                    <Text style={StylePerfilUsuario.nmUsuario}>Nome usuario</Text>
                </View>
                <InformacoesUsuario perfilUsuario descricao={"A vida é bela demais para vivermos a tarde dashjdh"} email={"lucas196078@gmail.com"} />
            </View>
        )
    }
}