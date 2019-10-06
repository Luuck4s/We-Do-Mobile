import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import EstiloComum from '../../EstiloComum'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'



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

        renderItem = ({ item }) => (<Ideia ideiaPage={true} key={item.id_ideia} {...item} />)

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