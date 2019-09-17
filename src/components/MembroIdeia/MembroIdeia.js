/**
 * Componente que recebe um array de usuario e separa as informações e retorna as imagens 
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import StyleMembroIdeia from './StyleMembroIdeia'

class MembroIdeia extends Component {

    /**
     * Filtra os membros do array recebido por props e realiza a contagem de quantos
     * membros participa da ideia
     */
    qtdMembros = () => {
        return this.props.membros.reduce((sum, item) => {
            if (item.status_solicitacao == 1) {
                sum++
            }
            return sum
        }, 0)

    }

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
                    <Text style={StyleMembroIdeia.textMore} onPress={this.props.onPressMembros}>+ {this.qtdMembros()}</Text>
                }
            </View>
        )
    }
}

export default MembroIdeia