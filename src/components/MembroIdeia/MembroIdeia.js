/**
 * Componente que recebe um array de usuario e separa as informações e retorna as imagens 
*/
import React, { Component } from 'react';
import { View, Text } from 'react-native'
import StyleMembroIdeia from './StyleMembroIdeia'

class MembroIdeia extends Component {

    render() {
        let membros = null
        let n = 0
        if (this.props.membros) {
            membros = this.props.membros.map((item, index) => {
                n = n + 1
                if (n <= 1) {
                    return (
                        <View style={StyleMembroIdeia.MeContainer} key={index}>
                            <Text style={StyleMembroIdeia.participantes}>{item.nm_usuario}</Text>
                        </View>
                    )
                }
            })
        }

        return (
            <View style={StyleMembroIdeia.container}>
                {this.props.membros.length > 0 &&
                    <Text style={StyleMembroIdeia.text}>Com</Text>
                }
                {membros}
                {this.props.membros.length > 0 && 
                    <Text style={StyleMembroIdeia.textMore} onPress={this.props.onPressMembros}> + </Text>
                }
            </View>
        )
    }
}

export default MembroIdeia