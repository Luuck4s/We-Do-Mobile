/**
 * Componente de redeniza a ideia, utilizado dentro desse componente outros componentes 
 * como o @MembroIdeia, @TecnologiaIdeia, @AddComentario.
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import StyleIdeia from './StyleIdeia'
import AddComentario from '../AddComentario/AddComentario'
import TecnologiaIdeia from '../TecnologiaIdeia/TecnologiaIdeia'
import EstiloComum from '../../EstiloComum'
import MembroIdeia from '../MembroIdeia/MembroIdeia'
import Icon from 'react-native-vector-icons/FontAwesome'

class Ideia extends Component {

    state = {
        curtido: false,
    }

    /**
     * Função responsavel por alterar a cor do icone de curtida ao ser cliclado
    */
    curtida = () => {
        this.setState({curtido: !this.state.curtido})
        this.props.onPressCurtir()
    }

    render() {
        let qtdCurtidas = this.props.curtidas.length > 0
            ? this.props.curtidas.map((item, index) => {
                return item.quantidade_curtida
            })
            : 0
        let qtdComentario = this.props.comentarios.length > 0
            ? this.props.comentarios.map((item, index) => {
                return item.quantidade_comentario
            })
            : 0
        
        return (
            <View style={StyleIdeia.container}>
                <Text style={StyleIdeia.titulo} onPress={this.props.onPresNomeIdeia}>{this.props.nm_ideia}</Text>
                <Text style={StyleIdeia.autor} onPress={this.props.onPressAutor}>por {this.props.nm_usuario}</Text>

                <TecnologiaIdeia tecnologias={this.props.tecnologias} />

                <Text style={StyleIdeia.descricao}>{this.props.ds_ideia}</Text>

                <MembroIdeia onPressMembros={this.props.onPressMembros} membros={this.props.membros} />

                <View style={{ flexDirection: 'row' }}>
                    <Icon name='heart' style={this.state.curtido ? StyleIdeia.iconCurtido : StyleIdeia.iconCurtida} size={19} onPress={() => this.curtida()} >
                        <Text style={StyleIdeia.numComentCurti}> {qtdCurtidas}</Text>
                    </Icon>
                    <Icon name='comment' style={StyleIdeia.iconComentario} size={19} color={EstiloComum.cores.fundoWeDo} onPress={this.props.onPressComentario} >
                        <Text style={StyleIdeia.numComentCurti}> {qtdComentario}</Text>
                    </Icon>
                </View>
                <TouchableOpacity style={StyleIdeia.interesse} onPress={this.props.onPressInteresse}>
                    <Text style={StyleIdeia.textInteresse}>Interesse</Text>
                </TouchableOpacity>
                <AddComentario />
            </View>
        )
    }
}

export default Ideia