import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import logoWeDo from '../../../assets/img/weDo_logo.png'
import StyleSplash from './StyleSplash'
export default class Splash extends Component {

    componentDidMount = () => {
        setTimeout(() => { this.props.navigation.navigate('Carregando') }, 2000)
    }

    render() {
        return (
            <View style={StyleSplash.container}>
                <Image source={logoWeDo}
                    style={StyleSplash.image} />
            </View>
        )
    }
}