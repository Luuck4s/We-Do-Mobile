import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, FlatList, ToastAndroid, RefreshControl } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'
import EstiloComum from '../../EstiloComum'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

export default class IdeiaPage extends Component {

    state = {
        ideia: [],
        idUsuario: null,
        atualizando: false,
        carregando: true,
    }

    componentDidMount = async () => {
        let idUsuario = await this.props.navigation.getParam('id_usuario')
        this.setState({ idUsuario: idUsuario })

        setTimeout(() => this.getInfoIdeia(), 1500)
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.navigation.getParam('id_ideia') !== prevProps.navigation.getParam('id_ideia')) {
            this.setState({ carregando: true, ideia: [] })
            let idIdeia = await this.props.navigation.getParam('id_ideia')
            let idUsuario = await this.props.navigation.getParam('id_usuario')

            this.setState({ idUsuario })

            Api.get(`/ideia/${idIdeia}&${this.state.idUsuario}`)
                .then((response) => {
                    Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                    let ideiaArr = []
                    ideiaArr.push(response.data.ideia)
                    setTimeout(() => this.setState({
                        ideia: ideiaArr,
                        carregando: false
                    }), 1500)
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

        await Api.get(`/ideia/${idIdeia}&${this.state.idUsuario}`)
            .then((response) => {
                Api.defaults.headers.common['Authorization'] = `${response.data.token}`

                let ideiaArr = []
                ideiaArr.push(response.data.ideia)

                this.setState({
                    ideia: ideiaArr,
                    carregando: false
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
                id_usuario: this.state.idUsuario,
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
                id_usuario: this.state.idUsuario
            },
            ideia: {
                id_ideia: idIdeia
            }
        })
    }

    /**
     * Mostrar informações sobre o autor indo para pagina do usuario 
     * @param - Membros 
     */
    infoAutor = (Membros) => {
        let idCriador = 0
        Membros.map((item, index) => {
            if (item.idealizador == 1) {
                idCriador = item.id_usuario
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

    /**
     * Função de adicionar comentarios
    */
    adicionarComentario = (data, idIdeia) => {
        Api.post(`/comentario/${this.state.idUsuario}`, {
            mensagem: {
                ct_mensagem: `${data}`
            },
            ideia: {
                id_ideia: idIdeia
            }
        }).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            ToastAndroid.show('Comentario enviado', ToastAndroid.SHORT);
        })
    }

    /**
     * Função para atualizar o feed
    */
    atualizaIdeia = async () => {

        this.setState({ ideia: [], carregando: true })

        let idIdeia = await this.props.navigation.getParam('id_ideia')

        await Api.get(`/ideia/${idIdeia}&${this.state.idUsuario}`)
            .then((response) => {
                Api.defaults.headers.common['Authorization'] = `${response.data.token}`

                let ideiaArr = []
                ideiaArr.push(response.data.ideia)

                this.setState({
                    ideia: ideiaArr,
                    carregando: false
                })
            })
            .catch((err) => {
                Alert.alert(`${err}`)
            })
    }

    render() {

        renderItem = ({ item }) => (<Ideia ideiaPage={true}
            {...item}
            onPressAutor={() => this.infoAutor(item.membros)}
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
                {this.state.carregando &&
                    <View>
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerTitle} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={[EstiloComum.shimmerUser, { marginLeft: 19 }]} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerDesc} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={[EstiloComum.shimmerPart, { marginLeft: 19 }]} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={[EstiloComum.shimmerButton, { marginRight: 15 }]} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerAddComment} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerComment} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerComment} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerComment} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={EstiloComum.shimmerMore} />
                    </View>
                }
                {this.state.ideia &&
                    <FlatList
                        refreshControl={<RefreshControl refreshing={this.state.atualizando} onRefresh={this.atualizaIdeia} />}
                        initialNumToRender={1}
                        data={this.state.ideia}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                }
            </View>
        )
    }
}