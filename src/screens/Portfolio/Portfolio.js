import React, { Component } from 'react'
import { View, Text, ScrollView, Alert, FlatList, RefreshControl } from 'react-native'
import Header from '../../components/Header/Header'
import StylePortfolio from './StylePortfolio'
import ComponetPortfolio from '../../components/ComponentPortifolio/ComponentPortfolio'
import Api from '../../api/Api'
import AsyncStorage from '@react-native-community/async-storage'

export default class Portfolio extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: '',
        ideias: [],
        carregando: true,
        atualizando: false,
        Semportfolio: false,
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })


        await Api.get(`/ideia/portifolio/${this.state.idUsuario}`).then((response) => {

            if (response.data.ideias == "") {
                this.setState({ Semportfolio: true, ideas: [] })
            } else {
                this.setState({ ideias: response.data.ideias })
            }
            this.setState({ carregando: false, atualizando: false })
        })
    }

    atualizarPortfolio = async () => {
        this.setState({ atualizando: true, ideias: [] })

        await Api.get(`/ideia/portifolio/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == "") {
                this.setState({ Semportfolio: true, ideas: [] })
            } else {
                this.setState({ ideias: response.data.ideias })
            }
            this.setState({ carregando: false, atualizando: false })
        })
    }

    ideia = (idIdeia) => {
        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario,
            paginaAnteriorIdeia: "Portfolio"
        })

        this.props.navigation.navigate('IdeiaPage', data)

    }

    render() {

        renderItem = ({ item }) => {

            return <ComponetPortfolio key={item.id_ideia} ideia={data => this.ideia(data)} {...item} />
        }

        return (
            <View>
                <Header paginaInicial={false} texto={"Portifólio"} icon={"chart-bar"} onPress={() => this.props.navigation.openDrawer()} />
                <ScrollView refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizarPortfolio()} />}>
                    <Text style={StylePortfolio.text}>Portfólio</Text>
                    <Text style={StylePortfolio.subText}>Projetos já concluídos.</Text>
                    {this.state.Semportfolio &&
                        <Text style={StylePortfolio.textNoIdeias}>Você não concluiu de nenhum projeto.</Text>
                    }
                    <FlatList
                        initialNumToRender={3}
                        data={this.state.ideias}
                        keyExtractor={item => `${item.id_ideia}`}
                        renderItem={renderItem} />
                </ScrollView>
            </View>
        )
    }
}