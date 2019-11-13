import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleProjetosAtuais from './StyleProjetosAtuais'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ComponentProjetosAtuais extends Component {
    render() {
        return (
            <View style={StyleProjetosAtuais.container}>
                <TouchableOpacity onPress={() => this.props.ideia(this.props.id_ideia)}>
                    <View style={StyleProjetosAtuais.IdeiaContainer}>
                        <Icon name={"users"} size={60} style={StyleProjetosAtuais.icon} />
                        <Text style={StyleProjetosAtuais.nomeIdeia}>{this.props.nm_ideia}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}