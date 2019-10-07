import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'

export const comentario =  [
    {
        "id_mensagem": 1,
        "id_usuario": 1,
        "nm_usuario": "Igor Miguel Galvão",
        "ct_mensagem": "Projeto muito legal, achei muito interressante",
        "hr_mensagem": "2019-04-13T13:20:12.000Z",
        "id_ideia": 1,
        "uso_mensagem": "2"
    },
    {
        "id_mensagem": 2,
        "id_usuario": 1,
        "nm_usuario": "Igor Miguel Galvão",
        "ct_mensagem": "Projeto muito legal, achei muito interressante",
        "hr_mensagem": "2019-04-13T13:20:12.000Z",
        "id_ideia": 1,
        "uso_mensagem": "2"
    },
    {
        "id_mensagem": 3,
        "id_usuario": 1,
        "nm_usuario": "Igor Miguel Galvão",
        "ct_mensagem": "Projeto muito legal, achei muito interressante",
        "hr_mensagem": "2019-04-13T13:20:12.000Z",
        "id_ideia": 1,
        "uso_mensagem": "2"
    }
]

export default class IdeiaPage extends Component {

    state = {
        ideia: []
    }

    componentDidMount = async () => {
        await this.getInfoIdeia()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.navigation.getParam('id_ideia') !== prevProps.navigation.getParam('id_ideia')) {
            let idIdeia = this.props.navigation.getParam('id_ideia')

            let idUsuario = this.props.navigation.getParam('id_usuario')

            Api.get(`/ideia/${idIdeia}&${idUsuario}`)
                .then((response) => {
                    Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                    let ideiaArr = []
                    ideiaArr.push(response.data.ideia)
                    this.setState({
                        ideia: ideiaArr
                    })
                })
                .catch((err) => {
                    Alert.alert(`${err}`)
                }
            )
        }
    }


    /**
     * Captura as informações da ideia 
    */
    getInfoIdeia = async () => {

        let idIdeia = await this.props.navigation.getParam('id_ideia')

        let idUsuario = await this.props.navigation.getParam('id_usuario')

        await Api.get(`/ideia/${idIdeia}&${idUsuario}`)
            .then((response) => {
                Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                let ideiaArr = []
                ideiaArr.push(response.data.ideia)
                this.setState({
                    ideia: ideiaArr
                })
            })
            .catch((err) => {
                Alert.alert(`${err}`)
            })
    }

    render() {

        renderItem = ({ item }) => (<Ideia ideiaPage={true} comentario={comentario} key={item.id_ideia} {...item} />)

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
                {this.state.ideia &&
                    <FlatList

                        initialNumToRender={1}
                        data={this.state.ideia}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                }
            </View>
        )
    }
}