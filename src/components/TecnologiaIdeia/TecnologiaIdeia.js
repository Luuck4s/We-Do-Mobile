/**
 * Componente utilizado para redenizar as tecnologias utilizadas na ideia
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import StyleTecnologiaIdeia from './StyleTecnologiaIdeia'
import Icon from 'react-native-vector-icons/FontAwesome5'


class TecnologiaIdeia extends Component {


    confirmarExclusao = (idTecnologia, nmTecnologia) => {
        Alert.alert(
            'Confirmação',
            `Tem certeza que remover a tecnologia ${nmTecnologia} da sua ideia ?`,
            [
                {
                    text: 'Cancelar', onPress: () => false
                },
                {
                    text: 'Confirmar', onPress: () =>  this.props.removerTecnologia(idTecnologia)
                }
            ]
        )
    }

    render() {
        let tecnologias = null
        let t = 0
        if (this.props.tecnologias) {
            if (this.props.ideiaPage && this.props.donoIdeia) {
                tecnologias = this.props.tecnologias.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => this.confirmarExclusao(item.id_tecnologia, item.nm_tecnologia)} key={index}>
                            <View style={[StyleTecnologiaIdeia.TecContainer]}>
                                <Icon name="times" size={10} style={StyleTecnologiaIdeia.iconRemove} />
                                <Text style={StyleTecnologiaIdeia.nomeTecnologia}>{item.nm_tecnologia}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            } else if (this.props.ideiaPage) {
                tecnologias = this.props.tecnologias.map((item, index) => {
                    return (
                        <View style={StyleTecnologiaIdeia.TecContainer} key={index}>
                            <Text style={StyleTecnologiaIdeia.nomeTecnologia}>{item.nm_tecnologia}</Text>
                        </View>
                    )
                })
            } else {
                tecnologias = this.props.tecnologias.map((item, index) => {
                    t = t + 1
                    if (t <= 3) {
                        return (
                            <View style={StyleTecnologiaIdeia.TecContainer} key={index}>
                                <Text style={StyleTecnologiaIdeia.nomeTecnologia}>{item.nm_tecnologia}</Text>
                            </View>
                        )
                    }
                })
            }

        }
        return (
            <View style={[StyleTecnologiaIdeia.container, { flexWrap: 'wrap' }]}>
                {tecnologias}
            </View>
        )
    }
}

export default TecnologiaIdeia