import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleProjetosAtuais from './StyleProjetosAtuais'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ComponentProjetosAtuais extends Component {
    render() {
        let ideias = null
        if (this.props.ideias) {
            ideias = this.props.ideias.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => alert(item.id_ideia)} key={index}>
                        <View style={StyleProjetosAtuais.IdeiaContainer}>
                            <Icon name={"users"} size={60} style={StyleProjetosAtuais.icon} />
                            <Text style={StyleProjetosAtuais.nomeIdeia}>{item.nm_ideia}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        return (
            <View style={StyleProjetosAtuais.container}>
                {ideias}
            </View >
        )
    }
}