import React, { Component } from 'react'
import { View, Alert, FlatList, ActivityIndicator, Text, TouchableOpacity, ToastAndroid} from 'react-native'
import Header from '../../components/Header/Header'
import Api from '../../api/Api'
import IdeiaPesquisa from '../../components/IdeiaPesquisa/IdeiaPesquisa'
import AsyncStorage from '@react-native-community/async-storage'
import StylePesquisa from './StylePesquisa'

const tecnologias = []

export default class Pesquisa extends Component {

    constructor(props){
        super(props)
    }

    state = {
        textoPesquisa: '',
        tecnologiaPesquisa: [],
        ideias: [],
        semResultados: false,
        pesquisando: true,
    }

    componentDidMount = async () => {
        await this.buscaTecnologias()
    }

    /**
     * Busca da API as tecnologias para exibir no Multiselect
    */
    buscaTecnologias = async () => {
        if (tecnologias.length === 0) {
            try {
                await Api.get('/tecnologia')
                    .then((response) => {
                        tecnologias.push(response.data)
                    }).catch(function (err) {
                        Alert.alert("Erro Tecnologias", `Ocorreu um erro inesperado ${err}`)
                    })
            } catch (error) {
                Alert.alert("Erro Tecnologias", `Ocorreu um erro inesperado ${error.data}`)
            }
        }
    }

    /**
     * Função resposanvel por realizar a pesquisa por palavra chave
    */
    realizarPesquisaPalavra = async () => {
        await Api.get(`/ideia/busca_nome/${this.state.textoPesquisa}`).then((response) => {

            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideias: response.data.ideias, semResultados: false })

            if (response.data.ideias.length == 0) {
                this.setState({ semResultados: true })
            }

        }).catch((err) => {
            this.setState({ semResultados: true })
            Alert.alert('Erro', `${err}`)
        })
    }

    /**
     * Realizar a pesquisa por tecnologia
    */
    realizarPesquisaTecnologia = async () => {
        await Api.get(`/ideia/busca_tecnologia/${this.state.tecnologiaPesquisa}`).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideias: response.data.ideias, semResultados: false })

            if (response.data.ideias.length == 0) {
                this.setState({ semResultados: true })
            }

        }).catch((err) => {
            this.setState({ semResultados: true })
            Alert.alert('Erro', `${err}`)
        })
    }

    /**
     * Realizar a pesquisa por tecnologia e palavra chave
    */
    realizarPesquisa = async () => {
        await Api.get(`/ideia/busca_tecnologia_nome/${this.state.tecnologiaPesquisa}&${this.state.textoPesquisa}`).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ ideias: response.data.ideias, semResultados: false })

            if (response.data.ideias.length == 0) {
                this.setState({ semResultados: true })
            }

        }).catch((err) => {
            this.setState({ semResultados: true })
            Alert.alert('Erro', `${err}`)
        })
    }

    /**
     * Verifica qual pesquisa sera realizada
    */
    tipoPesquisa = async () => {

        this.setState({ pesquisando: false })

        if (this.state.textoPesquisa && this.state.tecnologiaPesquisa != '') {

            this.realizarPesquisa()

        } else if (this.state.textoPesquisa) {

            this.realizarPesquisaPalavra()

        } else if (this.state.tecnologiaPesquisa != '') {

            this.realizarPesquisaTecnologia()
        }
    }

    /**
     * Função que verifica se o maximo de tecnologia ja foi selecionado para pesquisa
    */
    selecionarTecnologias = (tecnologiaPesquisa) => {
        this.setState({ tecnologiaPesquisa, pesquisando: true })
    }

    mudarTextoPesquisa = (texto) => {
        this.setState({ textoPesquisa: texto, pesquisando: true })
    }

    /**
     * Recarrega a mesma pagina porem passando o que foi pesquisado pelo usuario
    */
    trocarPagina = async () => {
        await this.props.navigation.navigate('Pesquisa')
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

    capturarNomeTecnologia = () => {
        let tec = this.state.tecnologiaPesquisa

        return tecnologias.map((item, index) => {
            for (let i = 0; i <= item.tecnologias.length; i++) {
                if (item.tecnologias[i].id_tecnologia == tec) {
                    return `${item.tecnologias[i].nm_tecnologia}`
                }
            }
        })

    }

    render() {

        renderItem = ({ item }) => (<IdeiaPesquisa key={item.id_ideia} onPress={() => this.ideia(item.id_ideia)} {...item} />)

        return (
            <View style={StylePesquisa.container}>
                <Header ScreenPesquisa={true}
                    items={tecnologias}
                    valueText={this.state.textoPesquisa}
                    onSelectedItemsChange={tecnologiaPesquisa => this.selecionarTecnologias(tecnologiaPesquisa)}
                    selectedItems={this.state.tecnologiaPesquisa}
                    onChangeText={texto => this.mudarTextoPesquisa(texto)}
                    voltarTela={() => this.props.navigation.navigate('Inicio')}
                    trocarPagina={() => this.trocarPagina()}
                    onSubmitEditing={() => this.tipoPesquisa()} />
                {this.state.pesquisando &&
                    <TouchableOpacity onPress={() => this.tipoPesquisa()}>
                        {this.state.tecnologiaPesquisa.length >= 1 && this.state.textoPesquisa.trim().length >= 1 &&
                            <Text style={StylePesquisa.textoPesquisa}>Pesquisa por {this.state.textoPesquisa} em {this.capturarNomeTecnologia()}</Text>
                        }
                        {this.state.textoPesquisa.trim().length >= 1 && !this.state.tecnologiaPesquisa.length >= 1 &&
                            <Text style={StylePesquisa.textoPesquisa}>Pesquisa por {this.state.textoPesquisa}</Text>
                        }
                        {this.state.tecnologiaPesquisa.length >= 1 && !this.state.textoPesquisa.trim().length >= 1 &&
                            <Text style={StylePesquisa.textoPesquisa}>Pesquisar ideias em {this.capturarNomeTecnologia()}</Text>
                        }
                    </TouchableOpacity>
                }
                {this.state.semResultados && !this.state.pesquisando &&
                    <Text style={StylePesquisa.textNoResultados}>Nenhum resultado foi encontrado.</Text>
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
