import React, { Component } from 'react'
import {View} from 'react-native'
import Header from '../../components/Header/Header'

export default class Notificacoes extends Component {

    constructor(props){
        super(props)
    }

    state = {

    }

    render(){
        return(
            <View>
                <Header paginaInicial={false} texto={"Notificações"} icon={"medapps"} onPress={() => this.props.navigation.openDrawer()}/>
            </View>
        )
    }
}