import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleInformacoes from './StyleInformacoes'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class InformacoesUsuario extends Component {


    /**
     * Função que recebe atraves de props um array de objetos json e armarzena cada tecnologia
     * na variavel de tecnolgias
    */
    renderTecnologias = () => {
        tecnologias = this.props.tecnologias.map((item, index) => {
            return (
                <View style={StyleInformacoes.TecContainer} key={index}>
                    <Text style={StyleInformacoes.nomeTecnologia}>{item.nm_tecnologia}</Text>
                </View>
            )
        })

        return tecnologias
    }

    render() {
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
                        <Text style={StyleInformacoes.textoSenha}>{this.props.senha}</Text>
                    </View>
                    <View style={StyleInformacoes.containerTecnologias}>
                        {this.renderTecnologias()}
                    </View>
                </View>
            )
        }
    }
}