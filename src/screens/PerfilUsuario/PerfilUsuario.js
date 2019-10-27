import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import { View, Text } from 'react-native';

export default class PerfilUsuario extends Component {
    state = {
        idUsuario: null
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
                <Text>{this.state.idUsuario}</Text>
            </View>)
    }
}