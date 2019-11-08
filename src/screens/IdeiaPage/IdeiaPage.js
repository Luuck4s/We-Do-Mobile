import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, FlatList, ToastAndroid, RefreshControl } from 'react-native'
import StyleIdeiaPage from './StyleIdeiaPage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'
import EstiloComum from '../../EstiloComum'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import moment from 'moment'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage'

export default class IdeiaPage extends Component {

    constructor(props){
        super(props)
    }

    state = {
        ideia: [],
        idUsuario: '',
        atualizando: false,
        carregando: true,
        idIdeia: ''
    }

    componentDidMount = async () => {
        let idUsuario = await this.props.navigation.getParam('id_usuario')
        let idIdeia = await this.props.navigation.getParam('id_ideia')
        this.setState({ idUsuario: idUsuario, idIdeia })

        setTimeout(() => this.getInfoIdeia(), 1500)
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.navigation.getParam('id_ideia') !== prevProps.navigation.getParam('id_ideia')) {
            this.setState({ carregando: true, ideia: [] })
            let idIdeia = await this.props.navigation.getParam('id_ideia')
            let idUsuario = await this.props.navigation.getParam('id_usuario')

            this.setState({ idUsuario, idIdeia })

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
                idCriador = { "idPerfilUsuario": item.id_usuario, "paginaAnterior": "IdeiaPage" }
            }
        })

        this.props.navigation.navigate('PerfilUsuario', idCriador)
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
    adicionarComentario = async (data, idIdeia) => {
        var nmUsuario = await AsyncStorage.getItem('@weDo:userName')

        await Api.post(`/comentario`, {
            usuario: {
                id_usuario: this.state.idUsuario
            },
            mensagem: {
                ct_mensagem: `${data}`
            },
            ideia: {
                id_ideia: idIdeia
            }
        }).then((response) => {
            let idUsuario = this.props.navigation.getParam('id_usuario')
            var ideiaLocal = [...this.state.ideia]
            var comentarios = ideiaLocal[0].comentarios
            var comentario = {
                "id_mensagem": response.data.id_comentario,
                "ct_mensagem": `${data}`,
                "id_ideia": idIdeia,
                "id_usuario": idUsuario,
                "nm_usuario": JSON.parse(nmUsuario),
                "hr_mensagem": moment().format()
            }

            comentarios.push(comentario)

            ideiaLocal[0].comentarios = comentarios

            this.setState({
                ideia: ideiaLocal
            })

            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            ToastAndroid.show('Comentario enviado', ToastAndroid.SHORT)
        })
    }

    /**
     * Função resposanvel por apagar o comentarios
     * @param id_mensagem
     */
    apagarComentario = async (id_mensagem) => {
        await Api.delete(`/comentario`, {
            data: {
                usuario: {
                    id_usuario: this.state.idUsuario
                },
                comentario: {
                    id_mensagem: id_mensagem
                }
            }
        }).then((response) => {

            if (response.data.msg) {

                var ideiaLocal = [...this.state.ideia]
                var comentarios = ideiaLocal[0].comentarios

                var novosComentarios = []

                comentarios.map((item, index) => {
                    if (item.id_mensagem != id_mensagem) {
                        novosComentarios.push(item)
                    }
                })
                ideiaLocal[0].comentarios = novosComentarios

                this.setState({
                    ideia: ideiaLocal
                })

                ToastAndroid.show('Comentario deletado', ToastAndroid.SHORT)
            }

            if (response.data.msg_erro) {
                ToastAndroid.show('Erro ao deletar comentario ' + response.data.msg_erro, ToastAndroid.SHORT)
            }

        }).catch(err => {
            Alert.alert(`${err}`)
        })


    }

    alterarDesc = async (data) => {
        await Api.put('/ideia', {
            ideia: {
                id_ideia: this.state.idIdeia,
                nm_ideia: data[0],
                ds_ideia: data[1],
                status_ideia: data[2]
            },
            usuario: {
                id_usuario: this.state.idUsuario
            }
        }).then((response) => {
            this.atualizaIdeia()
        })
    }

    /**
     * Função responsavel por alterar o titulo da ideia
     */
    alterarTitulo = async (data) => {
        await Api.put('/ideia', {
            ideia: {
                id_ideia: this.state.idIdeia,
                nm_ideia: data[0],
                ds_ideia: data[1],
                status_ideia: data[2]
            },
            usuario: {
                id_usuario: this.state.idUsuario
            }
        }).then((response) => {
            this.atualizaIdeia()
        })
    }

    /**
     * Função para atualizar a ideia
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

    voltarPagina = () => {
        this.props.navigation.pop()
    }


    render() {
        renderItem = ({ item }) => (<Ideia ideiaPage={true}
            {...item}
            onPressAutor={() => this.infoAutor(item.membros)}
            onPresNomeIdeia={() => this.ideia(item.id_ideia)}
            onPressMembros={() => this.membros(item.id_ideia)}
            onPressCurtir={() => this.curtirIdeia(item.id_ideia)}
            onPressInteresse={() => this.interesse(item.id_ideia)}
            adicionarComentario={data => this.adicionarComentario(data, item.id_ideia)}
            apagarComentario={id_mensagem => this.apagarComentario(id_mensagem)}
            alterarTitulo={data => this.alterarTitulo(data)}
            alterarDesc={data => this.alterarDesc(data)}
            idIdeia={this.state.idIdeia} />)

        return (
            <View style={StyleIdeiaPage.container}>
                <View style={StyleIdeiaPage.header}>
                    <TouchableOpacity onPress={() => this.voltarPagina()}>
                        <Icon name={'times-circle'} size={30} style={StyleIdeiaPage.icone} />
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