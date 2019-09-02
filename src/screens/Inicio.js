import React, { Component } from 'react'
import { View, Text, Alert, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import Api from '../api/Api'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Header from '../components/Header'
import Ideia from '../components/Ideia'
import EstiloComum from '../EstiloComum'
import ActionButton from 'react-native-action-button'
import AddIdeia from './AddIdeia'

import logo_icon from '../../assets/img/weDo_logo.png' // usada a logo apenas para testar por enquanto


export default class Inicio extends Component {

    state = {
        AddIdeia: false,
        ideias: [],
        carregando: true,
        atualizando: false
    }

    componentDidMount = () => {
        this.buscarFeed(),
            this.storeName()
    }

    /**
     * Função que guarda o nome do usuario
    */
    storeName = async () => {
        try {
            let idUsuario = await AsyncStorage.getItem('@weDo:userId')

            Api.get(`/usuario/perfil/${idUsuario}`).then((response) => {
                AsyncStorage.setItem('@weDo:nomeUsuario', JSON.stringify(response.data.perfil_usuario[0]))
                Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            })
        } catch (err) {
            Alert.alert('Erro', `${err}`)
        }
    }

    /**
     * Função que busca o feed de acordo com o id do usuario
    */
    buscarFeed = async () => {
        try {
            let idUsuario = await AsyncStorage.getItem('@weDo:userId')

            Api.get('/feed/' + idUsuario)
                .then((response) => {
                    Api.defaults.headers.common['Authorization'] = `${response.data.token}`
                    this.setState({ ideias: response.data.ideias })
                }).then(() => {
                    this.setState({carregando: false})
                }).catch((err) => {
                    this.setState({carregando: false,ideia: false})
                })

        } catch (err) {
            Alert.alert('Error', `${err}`)
        }
    }

    /**
     * Função para atualizar o feed
    */
    atualizarFeed = () => {
        this.setState({atualizando: true, carregando: true})
        this.buscarFeed().then(() => {
            this.setState({atualizando: false, carregando: false})
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
    curtirIdeia = (idIdeia) => {
        return Alert.alert('Curtida', `ideia: ${idIdeia}`)
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
        renderItem = ({ item }) => (<Ideia key={item.id_ideia} {...item} />)

        return (
            <View style={styles.container}>
                <Header paginaInicial={true} image={logo_icon} texto={"Página Inicial"} icon={"search"} onPress={() => Alert.alert("Teste", "teste")} onPressImage={() => this.props.navigation.openDrawer()} />
                <AddIdeia isVisible={this.state.AddIdeia} onCancel={() => this.setState({ AddIdeia: false })} adicionarIdeia={this.adicionarIdeia} />
                {this.state.carregando &&
                    <ActivityIndicator style={{padding: 10}} size="large" color={EstiloComum.cores.fundoWeDo}  />
                }
                {this.state.ideias == false &&
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})