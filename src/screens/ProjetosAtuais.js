import React, { Component } from 'react'
import {View} from 'react-native'
import Header from '../components/Header'

export default class Trends extends Component {

    state = {

    }

    render(){
        return(
            <View>
                <Header paginaInicial={false} texto={"Projetos Atuais"} icon={"code"} onPress={() => this.props.navigation.openDrawer()} />
            </View>
        )
    }
}