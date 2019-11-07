import React, { Component } from 'react'
import { View, Text} from 'react-native'
import Header from '../../components/Header/Header'
import StylePortfolio from './StylePortfolio'
import ComponetPortfolio from '../../components/ComponentPortifolio/ComponentPortfolio'


let ideias = [
    {
        "id_ideia": 1,
        "nm_ideia": "Teste Teste"
    },
    {
        "id_ideia": 12,
        "nm_ideia": "Teste Teste"
    },
    {
        "id_ideia": 13,
        "nm_ideia": "Teste Teste"
    },
    {
        "id_ideia": 14,
        "nm_ideia": "Teste Teste"
    },
]

export default class Portfolio extends Component {

    state = {

    }

    render() {
        return (
            <View>
                <Header paginaInicial={false} texto={"Portifólio"} icon={"chart-bar"} onPress={() => this.props.navigation.openDrawer()} />

                <Text style={StylePortfolio.text}>Portfólio</Text>
                <Text style={StylePortfolio.subText}>Projetos já concluídos.</Text>

                <ComponetPortfolio ideias={ideias} />
            </View>
        )
    }
}