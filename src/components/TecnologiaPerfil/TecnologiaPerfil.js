/**
 * Componente utilizado para redenizar as tecnologias no perfil
*/
import React, { Component } from 'react';
import { View, Text } from 'react-native'
import StyleTecnologiaPerfil from './StyleTecnologiaPerfil'

class TecnologiaPerfil extends Component {

    render() {
        let tecnologias = null
        if (this.props.tecnologias) {
            tecnologias = this.props.tecnologias.map((item, index) => {
                return (
                    <View style={StyleTecnologiaPerfil.TecContainer} key={index}>
                        <Text style={StyleTecnologiaPerfil.nomeTecnologia}>{item.nm_tecnologia}</Text>
                    </View>
                )
            })
        }
        return (
            <View style={StyleTecnologiaPerfil.containerTecnologias}>
                {tecnologias}
            </View>
        )
    }
}

export default TecnologiaPerfil