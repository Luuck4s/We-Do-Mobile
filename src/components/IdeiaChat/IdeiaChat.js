import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import StyleIdeiaChat from './StyleIdeiaChat'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class IdeiaChat extends Component {

  
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()}>
                <View style={StyleIdeiaChat.container}>
                    <Icon name={'users'} size={30} style={StyleIdeiaChat.icon} />
                    <Text style={StyleIdeiaChat.titulo}>{this.props.nm_ideia}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}