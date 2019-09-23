import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import EstiloComum from '../../EstiloComum'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import TecnologiaIdeia from '../../components/TecnologiaIdeia/TecnologiaIdeia'
import Ideia from '../../components/Ideia/Ideia'

export default class IdeiaPage extends Component {

    state = {
        ideia: [],
    }

    componentDidMount = async () => {
        await this.getInfoIdeia()
    }

    componentDidUpdate = async () => {
        await this.getInfoIdeia()
    }


    /**
     * 
    */
    getInfoIdeia = async () => {

        let idIdeia = this.props.navigation.getParam('id_ideia')
        let idUsuario = this.props.navigation.getParam('id_usuario')

        Api.get(`/ideia/${idIdeia}&${idUsuario}`).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideia: response.data.ideia })
        }).catch((err) => {
            Alert.alert(`${err}`)
        })
    }

    render() {
        return (
            <View style={StyleIdeiaPage.container}>
                <View style={StyleIdeiaPage.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Inicio')}>
                        <Icon name={'times-circle'} size={30} style={StyleIdeiaPage.icone} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Inicio')}>
                        <Text style={StyleIdeiaPage.tituloIdeia}>{this.state.ideia.nm_ideia}</Text>
                    </TouchableOpacity>
                </View>
                <View style={StyleIdeiaPage.informacoesIdeia}>
                    
                    <Ideia {...this.state.ideia} />
                </View>
                <View style={StyleIdeiaPage.participantes}>
                    <Text>Participantes</Text>
                </View>
                <View style={StyleIdeiaPage.comentarios}>
                    <Text>Comentarios</Text>
                </View>
            </View>
        )
    }
}