/**
 * Componente utilizado para redenizar as tecnologias utilizadas na ideia
*/
import React, { Component } from 'react';
import { View, Text } from 'react-native'
import StyleTecnologiaIdeia from './StyleTecnologiaIdeia'

class TecnologiaIdeia extends Component {

    render() {
        let tecnologias = null

        if (this.props.tecnologias) {
            tecnologias = this.props.tecnologias.map((item, index) => {
                return (
                    <View style={StyleTecnologiaIdeia.TecContainer} key={index}>
                        <Text style={StyleTecnologiaIdeia.nomeTecnologia}>{item.nm_tecnologia}</Text>
                    </View>
                )
            })
        }
        return (
            <View style={StyleTecnologiaIdeia.container}>
                {tecnologias}
            </View>
        )
    }
}

export default TecnologiaIdeia