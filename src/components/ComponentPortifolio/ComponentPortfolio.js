import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StylePortfolio from './StylePortfolio'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ComponentPortifolio extends Component {
    render() {
        let ideias = null
        if (this.props.ideias) {
            ideias = this.props.ideias.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => alert(item.id_ideia)} key={index}>
                        <View style={StylePortfolio.IdeiaContainer}>
                            <Icon name={"users"} size={50} style={StylePortfolio.icon} />
                            <Text style={StylePortfolio.nomeIdeia}>{item.nm_ideia}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        return (
            <View style={StylePortfolio.container}>
                {ideias}
            </View >
        )
    }
}

