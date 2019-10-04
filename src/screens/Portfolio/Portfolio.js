import React, { Component } from 'react'
import {View} from 'react-native'
import Header from '../../components/Header/Header'

export default class Portfolio extends Component {

    state = {

    }

    render(){
        return(
            <View>
                <Header paginaInicial={false} texto={"Portifólio"} icon={"chart-bar"} onPress={() => this.props.navigation.openDrawer()} />
            </View>
        )
    }
}