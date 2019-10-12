import React, { Component } from 'react'
import { View, Text, Alert, FlatList, ActivityIndicator, ToastAndroid, RefreshControl } from 'react-native'
import StyleInicio from './StyleInicio'
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage'
import Header from '../../components/Header/Header'
import Ideia from '../../components/Ideia/Ideia'
import EstiloComum from '../../EstiloComum'
import ActionButton from 'react-native-action-button'
import AddIdeia from '../AddIdeia/AddIdeia'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

export default class Inicio extends Component {

    state = {
        idUsuario: '',
        ideias: [],
        AddIdeia: false,
        semFeed: false,
        carregando: true,
        atualizando: false,
    }

    componentDidMount = async () => {
        setTimeout(() => this.buscarFeed(),2500)
    }

    /**
     * Função que busca o feed de acordo com o id do usuario
    */
    buscarFeed = async () => {
        try {
            let idUsuario = await AsyncStorage.getItem('@weDo:userId')

            await this.setState({ idUsuario })

            await Api.get('/feed/' + idUsuario)
                .then((response) => {
                    Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                    this.setState({ ideias: response.data.ideias, carregando: false })

                    if (response.data.ideias.length == 0) {
                        this.setState({ semFeed: true })
                    }
                }).catch((err) => {
                    this.setState({ carregando: false, semFeed: true, titleVisible: true })
                })

        } catch (err) {
            Alert.alert('Error', `${err}`)
        }
    }

    /**
     * Função para atualizar o feed
    */
    atualizarFeed = async () => {
        this.setState({ atualizando: true, carregando: true, ideias: [] })
        try {


            await Api.get('/feed/' + this.state.idUsuario)
                .then((response) => {
                    Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                    this.setState({ ideias: response.data.ideias, carregando: false, atualizando: false })

                    if (response.data.ideias.length == 0) {
                        this.setState({ semFeed: true })
                    }
                }).catch((err) => {
                    this.setState({ carregando: false, semFeed: true })
                })

        } catch (err) {
            Alert.alert('Error', `${err}`)
        }
    }


    /**
     * Funcao que vai passada para salvar a ideia
     * @param - dataIdeia 
    */
    adicionarIdeia = async (dataIdeia) => {

        this.setState({ AddIdeia: false })

        Api.post('/ideia', {
            ideia: {
                nm_ideia: dataIdeia.titulo,
                ds_ideia: dataIdeia.desc,
                tecnologias_ideia: dataIdeia.tecnologiasIdeia,
                tags_ideia: dataIdeia.tagsIdeia
            },
            usuario: {
                id_usuario: this.state.idUsuario
            }
        }).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            ToastAndroid.show('Ideia criada com sucesso', ToastAndroid.SHORT);
        })

        this.atualizarFeed()
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
        alert(idCriador)
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
     * Ideia em si
     * @param - IdIdeia
    */
    ideia = (idIdeia) => {

        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario
        })

        this.props.navigation.navigate('IdeiaPage', data)
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

    render() {
        /**
         * renderItem foi retirado de dentro da FlatList para melhor desenpenho do componente
         */
        renderItem = ({ item }) => (<Ideia inicio={true} key={item.id_ideia}
            {...item}
            onPressAutor={() => this.infoAutor(item.membros)}
            onPresNomeIdeia={() => this.ideia(item.id_ideia)}
            onPressMembros={() => this.membros(item.id_ideia)}
            onPressCurtir={() => this.curtirIdeia(item.id_ideia)}
            onPressComentario={() => this.comentarios(item.id_ideia)}
            onPressInteresse={() => this.interesse(item.id_ideia)}
            adicionarComentario={data => this.adicionarComentario(data, item.id_ideia)} />)

        return (
            <View style={StyleInicio.container}>
                <Header paginaInicial={true} texto={"Página Inicial"} icon={"search"} onPressImage={() => this.props.navigation.openDrawer()}
                    trocarPagina={() => this.props.navigation.navigate('Pesquisa')} />
                <AddIdeia isVisible={this.state.AddIdeia} onCancel={() => this.setState({ AddIdeia: false })} adicionarIdeia={dataIdeia => this.adicionarIdeia(dataIdeia)} />
                {this.state.carregando &&
                    <View>
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerTitle} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerUser} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerDesc} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerPart} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerButton} />

                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerTitle} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerUser} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerDesc} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerPart} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerButton} />

                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerTitle} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerUser} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerDesc} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerPart} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StyleInicio.shimmerButton} />
                    </View>
                }
                {this.state.semFeed &&
                    <Text>Não tem ideias de acordo com seu gosto</Text>
                }
                {this.state.ideias &&
                    <FlatList
                        refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarFeed()} />}
                        initialNumToRender={3}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                }
                <ActionButton buttonColor={EstiloComum.cores.fundoWeDo}
                    onPress={() => { this.setState({ AddIdeia: true }) }} />
            </View>
        )
    }
}