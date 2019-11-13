import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StylePortfolio from './StylePortfolio'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ComponentPortifolio extends Component {
    render() {
        return (
            <View style={StylePortfolio.container}>
                <TouchableOpacity onPress={() => this.props.ideia(this.props.id_ideia)}>
                    <View style={StylePortfolio.IdeiaContainer}>
                        <Icon name={"users"} size={50} style={StylePortfolio.icon} />
                        <Text style={StylePortfolio.nomeIdeia}>{this.props.nm_ideia}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}