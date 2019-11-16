/**
 * Componente utilizado para redenizar as tecnologias no perfil
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import StyleTecnologiaPerfil from './StyleTecnologiaPerfil'
import Icon from 'react-native-vector-icons/FontAwesome5'

class TecnologiaPerfil extends Component {


    confirmarExclusao = (idTecnologia, nmTecnologia) => {
        Alert.alert(
            'Confirmação',
            `Tem certeza que remover a tecnologia ${nmTecnologia} dos seus interesses ?`,
            [
                {
                    text: 'Cancelar', onPress: () => false
                },
                {
                    text: 'Confirmar', onPress: () => this.props.removerTecnologia(idTecnologia)
                }
            ]
        )
    }

    render() {
        let tecnologias = null
        if (this.props.tecnologias) {
            if (this.props.perfil) {
                tecnologias = this.props.tecnologias.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => this.confirmarExclusao(item.id_tecnologia, item.nm_tecnologia)} key={index}>
                            <View style={StyleTecnologiaPerfil.TecContainer} key={index}>
                                <Icon name="times" size={10} style={StyleTecnologiaPerfil.iconRemove} />
                                <Text style={StyleTecnologiaPerfil.nomeTecnologia}>{item.nm_tecnologia}</Text>
                            </View>
                        </TouchableOpacity>

                    )
                })
            } else {
                tecnologias = this.props.tecnologias.map((item, index) => {
                    return (
                        <View style={StyleTecnologiaPerfil.TecContainer} key={index}>
                            <Text style={StyleTecnologiaPerfil.nomeTecnologia}>{item.nm_tecnologia}</Text>
                        </View>
                    )
                })
            }
        }
        return (
            <View style={StyleTecnologiaPerfil.containerTecnologias}>
                {tecnologias}
            </View>
        )
    }
}

export default TecnologiaPerfil