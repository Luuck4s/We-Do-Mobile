import React, { Component } from 'react'
import {View} from 'react-native'
import Header from '../components/Header'

export default class Trends extends Component {

    state = {

    }

    render(){
        return(
            <View>
                <Header paginaInicial={false} texto={"Ajuda"} icon={"question"} onPress={() => this.props.navigation.openDrawer()} />
            </View>
        )
    }
}