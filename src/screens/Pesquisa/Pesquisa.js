import React, { Component } from 'react'
import { View, Alert, FlatList, ActivityIndicator, Text } from 'react-native'
import Header from '../../components/Header/Header'
import Api from '../../api/Api'
import IdeiaPesquisa from '../../components/IdeiaPesquisa/IdeiaPesquisa'
import EstiloComum from '../../EstiloComum'
import AsyncStorage from '@react-native-community/async-storage'

export default class Pesquisa extends Component {

    state = {
        ideias: [],
        carregando: false,
        semResultados: false,
    }

    /**
     * Função resposanvel por realizar a pesquisa por palavra chave
    */
    realizarPesquisaPalavra = async (textoPesquisa) => {
        this.setState({ carregando: true })
        await Api.get(`/ideia/busca_nome/${textoPesquisa}`).then((response) => {

            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideias: response.data.ideias, semResultados: false })

            if (response.data.ideias.length == 0) {
                this.setState({ semResultados: true })
            }

        }).catch((err) => {
            this.setState({ semResultados: true })
            Alert.alert('Erro', `${err}`)
        })
        this.setState({ carregando: false })
    }

    /**
     * Realizar a pesquisa por tecnologia
    */
    realizarPesquisaTecnologia = async (tecnologiaPesquisa) => {
        this.setState({ carregando: true })
        await Api.get(`/ideia/busca_tecnologia/${tecnologiaPesquisa}`).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideias: response.data.ideias, semResultados: false })

            if (response.data.ideias.length == 0) {
                this.setState({ semResultados: true })
            }

        }).catch((err) => {
            this.setState({ semResultados: true })
            Alert.alert('Erro', `${err}`)
        })
        this.setState({ carregando: false })
    }

    /**
     * Realizar a pesquisa por tecnologia e palavra chave
    */
    realizarPesquisa = async (tecnologiaPesquisa, textoPesquisa) => {
        this.setState({ carregando: true })
        await Api.get(`/ideia/busca_tecnologia_nome/${tecnologiaPesquisa}&${textoPesquisa}`).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideias: response.data.ideias, semResultados: false })

            if (response.data.ideias.length == 0) {
                this.setState({ semResultados: true })
            }

        }).catch((err) => {
            this.setState({ semResultados: true })
            Alert.alert('Erro', `${err}`)
        })
        this.setState({ carregando: false })
    }

    /**
     * Verifica qual pesquisa sera realizada
    */
    tipoPesquisa = async () => {
        let textoPesquisa = await this.props.navigation.getParam('textoPesquisa')
        let tecnologiaPesquisa = await this.props.navigation.getParam('tecnologiaSelect')

        if (textoPesquisa && tecnologiaPesquisa != '') {
            this.realizarPesquisa(tecnologiaPesquisa, textoPesquisa)
        } else if (textoPesquisa) {
            this.realizarPesquisaPalavra(textoPesquisa)
        } else if (tecnologiaPesquisa != '') {
            this.realizarPesquisaTecnologia(tecnologiaPesquisa)
        }
    }


    /**
     * Recarrega a mesma pagina porem passando o que foi pesquisado pelo usuario
    */
    trocarPagina = async (data) => {
        await this.props.navigation.navigate('Pesquisa', data)
        await this.tipoPesquisa()
    }

    /**
     * Exibir a pagina da Ideia
     * @param - idIdeia  
    */
    ideia = async (idIdeia) => {

        let data = []
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: idUsuario
        })

        this.props.navigation.navigate('IdeiaPage', data)
    }

    render() {

        renderItem = ({ item }) => (<IdeiaPesquisa key={item.id_ideia} onPress={() => this.ideia(item.id_ideia)} {...item}/>)

        return (
            <View>
                <Header ScreenPesquisa={true}
                    voltarTela={() => this.props.navigation.navigate('Inicio')}
                    trocarPagina={data => this.trocarPagina(data)} />
                {this.state.carregando &&
                    <ActivityIndicator style={{ padding: 10 }} size="large" color={EstiloComum.cores.fundoWeDo} />
                }
                {this.state.semResultados &&
                    <Text>Não a resultados para essa pesquisa</Text>
                }
                {this.state.ideias &&
                    <FlatList
                        initialNumToRender={2}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                }
            </View>
        )
    }
}
