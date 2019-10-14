import React, { Component } from 'react'
import {View} from 'react-native'
import Header from '../../components/Header/Header'
import StyleTrends from './StyleTrends'
import Api from '../../api/Api'

export default class Trends extends Component {

    state = {
        ideias: [],
        carregando: true,
    }

    componentDidMount = async () => {
        await this.buscarTrends()
    }

    buscarTrends = async () => {
        Api.get('/trends').then((response) =>{
            this.setState({ideias: response.ideias})
        })
    }

    render(){
        return(
            <View style={StyleTrends.container}>
                <Header paginaInicial={false} texto={"Trends Ideias"} icon={"crown"} onPress={() => this.props.navigation.openDrawer()} />
            </View>
        )
    }
}