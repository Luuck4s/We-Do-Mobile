import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleIdeiaPesquisa from './StyleIdeiaPesquisa'

export default class IdeiaPesquisa extends Component {
    render() {
        return (
            <View style={StyleIdeiaPesquisa.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={StyleIdeiaPesquisa.titulo}>{this.props.nm_ideia}</Text>
                    <Text style={StyleIdeiaPesquisa.autor}>{this.props.nm_usuario}</Text>
                    <Text style={StyleIdeiaPesquisa.desc}>{this.props.ds_ideia}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}