import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'

export const comentario = [
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
        ideia: [],
        id_usuario: null,
    }

    componentDidMount = async () => {
        let idUsuario = await this.props.navigation.getParam('id_usuario')
        this.setState({ id_usuario: idUsuario })

        await this.getInfoIdeia()
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.navigation.getParam('id_ideia') !== prevProps.navigation.getParam('id_ideia')) {

            let idIdeia = await this.props.navigation.getParam('id_ideia')
            let idUsuario = await this.props.navigation.getParam('id_usuario')

            this.setState({ id_usuario: idUsuario })

            Api.get(`/ideia/${idIdeia}&${this.state.id_usuario}`)
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

        await Api.get(`/ideia/${idIdeia}&${this.state.id_usuario}`)
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


    /**
     * Mostra interesse na ideia
     * @param - idIdeia 
    */
    interesse = (idIdeia) => {
        Api.post('/interesse', {
            usuario: {
                id_usuario: this.state.id_usuario,
            },
            ideia: {
                id_ideia: idIdeia
            }
        })
    }

    /**
     * Curtir ideia
     * @param - IdIdeia
     */
    curtirIdeia = async (idIdeia) => {
        Api.post('/curtida', {
            usuario: {
                id_usuario: this.state.id_usuario
            },
            ideia: {
                id_ideia: idIdeia
            }
        })
    }

    /**
    * Comentarios da ideia
    * @param - IdIdeia
    */
    comentarios = (idIdeia) => {
        this.ideia(idIdeia)
    }

    /**
     * Membros da ideia
     * @param - IdIdeia
    */
    membros = (idIdeia) => {
        this.ideia(idIdeia)
    }


    render() {

        renderItem = ({ item }) => (<Ideia ideiaPage={true}
            {...item}
            comentario={comentario} key={item.id_ideia}
            onPressAutor={() => this.infoAutor(item.id_ideia)}
            onPresNomeIdeia={() => this.ideia(item.id_ideia)}
            onPressMembros={() => this.membros(item.id_ideia)}
            onPressCurtir={() => this.curtirIdeia(item.id_ideia)}
            onPressComentario={() => this.comentarios(item.id_ideia)}
            onPressInteresse={() => this.interesse(item.id_ideia)}
            adicionarComentario={data => this.adicionarComentario(data, item.id_ideia)} />)

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