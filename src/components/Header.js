//Componente que redeniza a parte superior da tela inicial do app
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import EstiloComum from '../EstiloComum';

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.paginaInicial && 
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={this.props.onPressImage} >
                            <Image source={this.props.image} style={styles.image} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{this.props.texto}</Text>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Icon name={this.props.icon} size={25} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                }
                {!this.props.paginaInicial && 
                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>{this.props.texto}</Text>
                    </View>
                }
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
        fontFamily: EstiloComum.fontFamily,
        marginLeft: '3%',
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
    }
})

export default Header