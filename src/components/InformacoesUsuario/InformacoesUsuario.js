import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import StyleInformacoes from './StyleInformacoes'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TecnologiaPerfil from '../TecnologiaPerfil/TecnologiaPerfil'

export default class InformacoesUsuario extends Component {


    render(){
        if (this.props.perfilUsuario) {
            return (
                <View style={StyleInformacoes.container}>

                    <View style={StyleInformacoes.containerDesc}>
                        <Icon name={"quote-left"} size={15} style={StyleInformacoes.iconDesc} />
                        <Text style={StyleInformacoes.textoDesc}>{this.props.descricao}</Text>
                    </View>
                    <View style={StyleInformacoes.containerEmail}>
                        <Icon name={"envelope"} size={20} style={StyleInformacoes.iconEmail} />
                        <Text style={StyleInformacoes.textoEmail}>{this.props.email}</Text>
                    </View>

                    <View style={StyleInformacoes.containerTecnologias}>
                        <TecnologiaPerfil tecnologias={this.props.tecnologias} />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={StyleInformacoes.container}>
                    <View style={StyleInformacoes.containerDesc}>
                        <Icon name={"quote-left"} size={15} style={StyleInformacoes.iconDesc} />
                        <Text style={StyleInformacoes.textoDesc}>{this.props.descricao}</Text>
                    </View>
                    <View style={StyleInformacoes.containerEmail}>
                        <Icon name={"envelope"} size={20} style={StyleInformacoes.iconEmail} />
                        <Text style={StyleInformacoes.textoEmail}>{this.props.email}</Text>
                    </View>
                    <View style={StyleInformacoes.containerSenha}>
                        <Icon name={"lock"} size={20} style={StyleInformacoes.iconSenha} />
                        <Text style={StyleInformacoes.textoSenha}>********</Text>
                    </View>
                    <View style={StyleInformacoes.containerTecnologias}>
                        <TecnologiaPerfil tecnologias={this.props.tecnologias} />
                    </View>
                </View>
            )
        }
    }
}