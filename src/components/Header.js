//Componente que redeniza a parte superior da tela inicial do app
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={this.props.image} style={styles.image} />
                    <Text style={styles.title}>{this.props.texto}</Text>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Icon name={this.props.icon} size={25} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        borderRadius: 100,
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    icon: {
        marginLeft: '63%'
    },
    title: {
        marginLeft: '3%',
        color: '#000',
        fontSize: 20,
    }
})

export default Header