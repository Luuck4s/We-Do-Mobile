/**
 * Componente que redeniza o Header das paginas que o usuario vera após a autenticação
 */
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import StyleHeader from './StyleHeader'
import EstiloComum from '../../EstiloComum'

class Header extends Component {
    render() {
        return (
            <View style={StyleHeader.container}>
                {this.props.paginaInicial && 
                    <View style={StyleHeader.rowContainer}>
                        <TouchableOpacity onPress={this.props.onPressImage} >
                            <Image source={this.props.image} style={StyleHeader.image} />
                        </TouchableOpacity>
                        <Text style={StyleHeader.title}>{this.props.texto}</Text>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Icon name={this.props.icon} size={25} style={StyleHeader.icon} />
                        </TouchableOpacity>
                    </View>
                }
                {!this.props.paginaInicial && 
                    <View style={StyleHeader.rowContainer2}>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Icon name={this.props.icon} size={30} color={EstiloComum.cores.fundoWeDo} style={StyleHeader.icon2} />  
                        </TouchableOpacity>                    
                        <Text style={StyleHeader.title2}>{this.props.texto}</Text>
                    </View>
                }
            </View>
        )
    }
}


export default Header