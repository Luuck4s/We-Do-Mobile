//Componente que redeniza a parte superior da tela inicial do app
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
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
                    <View style={styles.rowContainer2}>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Icon name={this.props.icon} size={30} color={EstiloComum.cores.fundoWeDo} style={styles.icon2} />  
                        </TouchableOpacity>                    
                        <Text style={styles.title2}>{this.props.texto}</Text>
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
    rowContainer2: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
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
    icon2: {
        marginLeft: '3%',
    },
    title: {
        fontFamily: EstiloComum.fontFamily,
        marginLeft: '3%',
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
    },
    title2: {
        fontFamily: EstiloComum.fontFamily,
        marginLeft: '4%',
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
    }
})

export default Header