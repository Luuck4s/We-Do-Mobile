import React, { Component } from 'react'
import {View} from 'react-native'
import Header from '../../components/Header/Header'

export default class Trends extends Component {

    state = {

    }

    render(){
        return(
            <View>
                <Header paginaInicial={false} texto={"Notificações"} icon={"medapps"} />
            </View>
        )
    }
}