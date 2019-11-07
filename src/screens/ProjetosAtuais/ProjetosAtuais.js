import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Header from '../../components/Header/Header'
import ComponentProjetosAtuais from '../../components/ComponentProjetosAtuais/ComponentProjetosAtuais'
import StyleProjetosAtuais from './StyleProjetosAtuais'

let ideias = [
    {
        "id_ideia": 12,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 122,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 122,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 1232,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 312,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 312,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 312,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 312,
        "nm_ideia": "Teste"
    }
]

export default class ProjetosAtuais extends Component {

    state = {

    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Header paginaInicial={false} texto={"Projetos Atuais"} icon={"code"} onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={StyleProjetosAtuais.text}>Projetos Atuais</Text>
                    <Text style={StyleProjetosAtuais.subText}>Projetos em andamento.</Text>
                    <ComponentProjetosAtuais ideias={ideias} />
                </View>
            </ScrollView>
        )
    }
}