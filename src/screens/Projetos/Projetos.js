import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import Header from '../../components/Header/Header'
import IdeiaChat from '../../components/IdeiaChat/IdeiaChat'

const ideias = [
    {
        "id_ideia": 2,
        "nm_ideia": 'SGEdhasjhdjkashjdhhashdkhashdjkhsahdjhasjhdjkahjkhdjkahjkhdajkshjkdhjkahjhas'
    },
    {
        "id_ideia": 21,
        "nm_ideia": 'SGE'
    },
    {
        "id_ideia": 23,
        "nm_ideia": 'SGE'
    }
]

export default class Projetos extends Component {

    mudarPagina = (idIdeia) => {
       

        let id = {
            "idIdeiaChat": idIdeia
        }

        this.props.navigation.navigate("Chat", id)
    }


    state = {

    }

    render() {

        renderItem = ({ item }) => (<IdeiaChat {...item} onPress={() => this.mudarPagina(item.id_ideia)} />)

        return (
            <View>
                <Header paginaInicial={false} texto={"Chat"} icon={"comment-alt"} onPress={() => this.props.navigation.openDrawer()} />
                <FlatList
                    initialNumToRender={3}
                    data={ideias}
                    keyExtractor={item => `${item.id_ideia}`}
                    renderItem={renderItem} />
            </View>

        )
    }
}