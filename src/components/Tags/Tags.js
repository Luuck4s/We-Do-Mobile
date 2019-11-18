import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleTags from './StyleTags'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Tags extends Component {
    render() {
        let tags = null
        if (this.props.tags) {
            tags = this.props.tags.map((item, index) => {
                return (
                    <View style={StyleTags.containerTags} key={index}>
                        <Icon name={'tag'} size={10} style={StyleTags.icon} />
                        <Text style={StyleTags.tag}>{item.nm_tag}</Text>
                    </View>
                )

            })
        }
        return (
            <View style={StyleTags.container}>
                {tags}
            </View>
        )
    }
}
