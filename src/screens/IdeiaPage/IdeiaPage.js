import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import EstiloComum from '../../EstiloComum'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'

let ideia = []

export default class IdeiaPage extends Component {

    
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

        let idIdeia = await this.props.navigation.getParam('id_ideia')
        
        let idUsuario = await this.props.navigation.getParam('id_usuario')

        await Api.get(`/ideia/${idIdeia}&${idUsuario}`)
        .then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            ideia = []
            ideia.push(response.data.ideia)
        })
        .catch((err) => {
            Alert.alert(`${err}`)
        })
    }

    render(){
        return (
            <View style={StyleIdeiaPage.container}>
                <View style={StyleIdeiaPage.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Inicio')}>
                        <Icon name={'times-circle'} size={30} style={StyleIdeiaPage.icone} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Inicio')}>
                        <Text style={StyleIdeiaPage.tituloIdeia}>Ideia</Text>
                    </TouchableOpacity>
                </View>
                {ideia[0] &&
                    <Ideia ideiaPage={true} tecnologias={ideia[0].tecnologia} {...ideia[0]} />
                }
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