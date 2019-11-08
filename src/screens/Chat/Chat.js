import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Header from '../../components/Header/Header'


export default class Chat extends Component {

    voltarPagina = () => {

        this.props.navigation.goBack()

    }

    render() {
        return (

            <View>
                <Header icon={"arrow-left"} onPress={() => this.voltarPagina()} />
                <Text>{this.props.navigation.getParam('idIdeiaChat')}</Text>
            </View>

        )
    }
}