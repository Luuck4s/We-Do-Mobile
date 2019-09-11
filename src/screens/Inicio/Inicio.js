import React, { Component } from 'react'
import { View, Text, Alert, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import StyleInicio from './StyleInicio'
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage'
import Header from '../../components/Header/Header'
import Ideia from '../../components/Ideia/Ideia'
import EstiloComum from '../../EstiloComum'
import ActionButton from 'react-native-action-button'
import AddIdeia from '../AddIdeia/AddIdeia'

import logo_icon from '../../../assets/img/weDo_logo.png'


export default class Inicio extends Component {

    state = {
        idUsuario: '',
        ideias: [],
        AddIdeia: false,
        semFeed: false,
        carregando: true,
        atualizando: false
    }

    componentDidMount = async () => {
        await this.buscarFeed()
    }

    /**
     * Função que busca o feed de acordo com o id do usuario
    */
    buscarFeed = async () => {
        try {
            let idUsuario = await AsyncStorage.getItem('@weDo:userId')

            await this.setState({ idUsuario })

            Api.get('/feed/' + idUsuario)
                .then((response) => {
                    Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                    this.setState({ ideias: response.data.ideias, carregando: false })
                }).catch((err) => {
                    this.setState({ carregando: false, semFeed: true })
                })

        } catch (err) {
            Alert.alert('Error', `${err}`)
        }
    }

    /**
     * Função para atualizar o feed
    */
    atualizarFeed = () => {
        this.setState({ atualizando: true, carregando: true })
        this.buscarFeed().then(() => {
            this.setState({ atualizando: false, carregando: false })
        })
    }

    /**
     * Funcao que vai passada para salvar a ideia
    */
    adicionarIdeia = ideia => {

        Alert.alert('Ideia Criada', `${ideia}`)

        this.setState({ AddIdeia: false })
    }

    /**
     * Mostrar informações sobre o autor
     * @param - idAutor 
     */
    infoAutor = (idAutor) => {
        return Alert.alert('Autor', `id: ${idAutor}`);
    }

    /**
     * Mostra interesse na ideia
     * @param - idIdeia 
    */
    interesse = (idIdeia) => {
        return Alert.alert('Interesse', `ideia: ${idIdeia}`)
    }

    /**
     * Curtir ideia
     */
    curtirIdeia = async (idIdeia) => {
        Api.post('/feed/curtida', {
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
    */
    comentarios = (idIdeia) => {
        return Alert.alert('Comentarios', `ideia: ${idIdeia}`)
    }

    /**
     * Membros da ideia
    */
    membros = (idIdeia) => {
        return Alert.alert('Membros', `ideia: ${idIdeia}`)
    }

    /**
     * Ideia em si
    */
    ideia = (idIdeia) => {
        return Alert.alert('Titulo Ideia', `Ideia: ${idIdeia}`)
    }

    render() {
        /**
         * renderItem foi retirado de dentro da FlatList para melhor desenpenho do componente
         */
        renderItem = ({ item }) => (<Ideia key={item.id_ideia}
            {...item}
            onPressAutor={() => this.infoAutor(item.id_ideia)}
            onPresNomeIdeia={() => this.ideia(item.id_ideia)}
            onPressMembros={() => this.membros(item.id_ideia)}
            onPressCurtir={() => this.curtirIdeia(item.id_ideia)}
            onPressComentario={() => this.comentarios(item.id_ideia)}
            onPressInteresse={() => this.interesse(item.id_ideia)} />)

        return (
            <View style={StyleInicio.container}>
                <Header paginaInicial={true} image={logo_icon} texto={"Página Inicial"} icon={"search"} onPressImage={() => this.props.navigation.openDrawer()}
                    trocarPagina={() => this.props.navigation.navigate('Pesquisa')}/>
                <AddIdeia isVisible={this.state.AddIdeia} onCancel={() => this.setState({ AddIdeia: false })} adicionarIdeia={this.adicionarIdeia} />
                {this.state.carregando &&
                    <ActivityIndicator style={{ padding: 10 }} size="large" color={EstiloComum.cores.fundoWeDo} />
                }
                {this.state.semFeed &&
                    <Text>Não tem ideias de acordo com seu gosto</Text>
                }
                {this.state.ideias &&
                    <FlatList
                        refreshControl={<RefreshControl refreshing={this.state.atualizando} onRefresh={this.atualizarFeed} />}
                        initialNumToRender={2}
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