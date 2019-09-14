import React, { Component } from 'react'
import { View, Alert, FlatList } from 'react-native'
import Header from '../../components/Header/Header'
import Api from '../../api/Api'
import Ideia from '../../components/Ideia/Ideia'

export default class Pesquisa extends Component {

    state = {
        ideias: [],
    }

    /**
     * Função resposanvel por realizar a pesquisa por palavra chave
    */
    realizarPesquisaPalavra = async (textoPesquisa) => {
        Api.get(`/ideia/buscar/${textoPesquisa}`).then((response) => {
            Api.defaults.headers.common['Authorization'] = `${response.data.token}`
            this.setState({ideias: response.data.ideias})
        }).catch((err) => {
            Alert.alert(`${err}`)
        })
    }

    /**
     * Realizar a pesquisa por tecnologia
    */
    realizarPesquisaTecnologia = async () => {
        Alert.alert('Pesquisa Tecnologia')
    }

    /**
     * Realizar a pesquisa por tecnologia e palavra chave
    */
    realizarPesquisa = async () => {
        Alert.alert('Pesquisa os dois')
    }

    /**
     * Verifica qual pesquisa sera realizada
    */
    tipoPesquisa = async () => {
        let textoPesquisa = await this.props.navigation.getParam('textoPesquisa')
        let tecnologiaPesquisa = await this.props.navigation.getParam('tecnologiaSelect')

        if(textoPesquisa && tecnologiaPesquisa != ''){
            this.realizarPesquisa()
        }else if(textoPesquisa){
            this.realizarPesquisaPalavra(textoPesquisa)
        } else if(tecnologiaPesquisa != '') {
            this.realizarPesquisaTecnologia()
        }
    }


    /**
     * Recarrega a mesma pagina porem passando o que foi pesquisado pelo usuario
    */
    trocarPagina = async (data) => {
        await this.props.navigation.navigate('Pesquisa', data)
        await this.tipoPesquisa()
    }

    render() {

        renderItem = ({ item }) => (<Ideia key={item.id_ideia} {...item} />)

        return (
            <View>
                <Header ScreenPesquisa={true}
                    voltarTela={() => this.props.navigation.navigate('Inicio')}
                    trocarPagina={data => this.trocarPagina(data)} />
                 <FlatList
                        initialNumToRender={2}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
            </View>
        )
    }
}
