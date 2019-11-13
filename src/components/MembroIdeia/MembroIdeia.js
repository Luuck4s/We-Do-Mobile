/**
 * Componente que recebe um array de usuario e separa as informações e retorna as imagens 
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import StyleMembroIdeia from './StyleMembroIdeia'
import EstiloComum from '../../EstiloComum';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class MembroIdeia extends Component {

    state = {
        maximo: 1,
        mostrarTodos: true,
        totalMembros: 0,
    }

    componentDidMount = () => {
        this.qtdMembros()
    }

    /**
     * Filtra os membros do array recebido por props e realiza a contagem de quantos
     * membros participa da ideia
     */
    qtdMembros = () => {
        let total = 0

        this.props.membros.map((item, index) => {
            if (item.status_solicitacao == 1 && item.idealizador != 1) {
                total = total + 1
            }
        })

        this.setState({ totalMembros: total })

    }

    mostrarTodosParticipantes = () => {
        if (this.props.ideiaPage) {
            if (this.state.maximo == this.props.membros.length) {
                this.setState({ maximo: 1, mostrarTodos: true })
            } else {
                this.setState({ maximo: this.props.membros.length, mostrarTodos: false })
            }
        } else {
            this.props.onPressMembros()
        }
    }

    verificarRemoverDaIdeia = (nmUsuario, idUsuario) => {
        Alert.alert(
            'Confirmação',
            `Deseja realmente remover ${nmUsuario} da ideia ?`,
            [
                {
                    text: 'Cancelar', onPress: () => false
                },
                { text: 'Confirmar', onPress: () => this.props.removerUsuario(idUsuario) }
            ]
        )
    }

    render() {
        let membros = null
        let n = 0
        if (this.props.membros) {
            membros = this.props.membros.map((item, index) => {
                n++
                if (n <= this.state.maximo && item.status_solicitacao == 1) {
                    return (
                        <View style={this.state.maximo >= 1 ? StyleMembroIdeia.MeContainerMax : StyleMembroIdeia.MeContainer} key={index}>

                            {this.state.mostrarTodos && item.status_solicitacao == 1 &&
                                <Text style={StyleMembroIdeia.participantes}>{item.nm_usuario}</Text>
                            }
                            {!this.state.mostrarTodos && this.props.criadorIdeia && item.idealizador != 1 &&
                                <TouchableOpacity onPress={() => this.verificarRemoverDaIdeia(item.nm_usuario, item.id_usuario)}>
                                    <Icon name={"user-times"} size={17} style={StyleMembroIdeia.iconRemove} />
                                </TouchableOpacity>
                            }
                            {!this.state.mostrarTodos && item.idealizador == 1 &&
                                <Text style={StyleMembroIdeia.participantes}><Icon name={'crown'} size={15} style={StyleMembroIdeia.iconDestaque} /> {item.nm_usuario}</Text>
                            }
                            {!this.state.mostrarTodos && item.idealizador != 1 && item.status_solicitacao == 1 &&
                                <Text style={StyleMembroIdeia.participantes}>{item.nm_usuario}</Text>
                            }


                        </View>
                    )
                }
            })
        }

        return (
            <View style={this.state.maximo > 1 ? StyleMembroIdeia.containerMax : StyleMembroIdeia.container}>
                {this.props.membros.length > 0 &&
                    <Text style={!this.state.mostrarTodos ? [StyleMembroIdeia.text, { fontWeight: 'bold', color: EstiloComum.cores.fundoWeDo, textAlign: 'center' }] : StyleMembroIdeia.text}>{!this.state.mostrarTodos ? 'Participantes' : 'Com'}</Text>
                }
                {membros}
                {this.props.membros.length > 0 && this.props.membros.length != 1 && this.state.mostrarTodos && this.state.totalMembros != 0 &&
                    <TouchableOpacity style={StyleMembroIdeia.more} onPress={() => this.mostrarTodosParticipantes()}>
                        <Text style={StyleMembroIdeia.textMore}>+ {this.state.totalMembros}</Text>
                    </TouchableOpacity>
                }
                {!this.state.mostrarTodos &&
                    <TouchableOpacity onPress={() => this.mostrarTodosParticipantes()}>
                        <Text style={StyleMembroIdeia.mostrarMenos}>Mostrar Menos</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}