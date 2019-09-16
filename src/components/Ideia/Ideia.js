/**
 * Componente de redeniza a ideia, utilizado dentro desse componente outros componentes 
 * como o @MembroIdeia, @TecnologiaIdeia, @AddComentario.
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import StyleIdeia from './StyleIdeia'
import AddComentario from '../AddComentario/AddComentario'
import TecnologiaIdeia from '../TecnologiaIdeia/TecnologiaIdeia'
import EstiloComum from '../../EstiloComum'
import MembroIdeia from '../MembroIdeia/MembroIdeia'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';

class Ideia extends Component {

    state = {
        curtido: false,
        interesse: false,
        idUsuarioAtual: null,
        qtdCurtidas: 0,
    }

    componentDidMount = async () => {
        await this.getIdUsuario()
        await this.ideiaCurtidaBanco()
        await this.quantidadeCurtida()
        await this.interesseBanco()
    }

    /**
     * Função responsavel por buscar o Id do usuario no storage
    */
    getIdUsuario = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')
        this.setState({ idUsuarioAtual: idUsuario })
    }

    quantidadeCurtida = () => {
        this.setState({ qtdCurtidas: this.props.curtidas.length })
    }

    /**
     * Função que verifica se o usuario ja curtiu previamente a ideia
    */
    ideiaCurtidaBanco = () => {
        this.props.curtidas.map((item, index) => {
            if (this.state.idUsuarioAtual == item.id_usuario) {
                this.setState({ curtido: true })
            } else {
                this.setState({ curtido: false })
            }
        })
    }

    /**
     * Função que verifica se o usuario ja tem interesse nessa ideia e 
     * muda o estado do componente
    */
    interesseBanco = () => {
        this.props.membros.map((item, index) => {
            if (this.state.idUsuarioAtual == item.id_usuario) {
                if (item.status_solicitacao == 0) {
                    this.setState({ interesse: true })
                }
            }
        })
    }

    /**
     * Função que muda o state e espera receber uma função pela props
    */
    interesse = () => {
        if (this.state.interesse) {
            this.props.onPressInteresse()
            this.setState({ interesse: false })
            ToastAndroid.show('Interesse removido', ToastAndroid.SHORT);
        }

        if (!this.state.interesse) {
            this.props.onPressInteresse()
            this.setState({ interesse: true })
            ToastAndroid.show('Interesse adicionado', ToastAndroid.SHORT);
        }
    }

    /**
     * Função responsavel por carregar o botao de interesse de acordo com o state
    */
    renderInteresse = () => {
        if (this.state.interesse) {
            return <Icon name='check' size={20} style={StyleIdeia.iconInteresse} />
        } else {
            return <Text style={StyleIdeia.textInteresse}>Interesse</Text>
        }
    }

    /**
     * Função responsavel por alterar a cor do icone de curtida ao ser cliclado
    */
    curtida = () => {
        if (this.state.curtido) {
            this.props.onPressCurtir()
            this.setState({ curtido: false }, this.setState({ qtdCurtidas: this.state.qtdCurtidas - 1 }))

        }

        if (!this.state.curtido) {
            this.props.onPressCurtir()
            this.setState({ curtido: true }, this.setState({ qtdCurtidas: this.state.qtdCurtidas + 1 }))

        }
    }

    render() {
        let idealizador = this.props.membros.map((item, index) => {
            if (item.idealizador == 1) {
                return item.nm_usuario
            }
        })

        let qtdComentario = this.props.comentarios.length > 0
            ? this.props.comentarios.map((item, index) => {
                return item.quantidade_comentario
            })
            : 0

        return (
            <View style={StyleIdeia.container}>
                <Text style={StyleIdeia.titulo} onPress={this.props.onPresNomeIdeia}>{this.props.nm_ideia}</Text>
                <Text style={StyleIdeia.autor} onPress={this.props.onPressAutor}>por {idealizador}</Text>

                <TecnologiaIdeia tecnologias={this.props.tecnologias} />

                <Text style={StyleIdeia.descricao}>{this.props.ds_ideia}</Text>

                <MembroIdeia onPressMembros={this.props.onPressMembros} membros={this.props.membros} />

                <View style={{ flexDirection: 'row' }}>
                    <Icon name='heart' style={this.state.curtido ? StyleIdeia.iconCurtido : StyleIdeia.iconCurtida} size={19} onPress={() => this.curtida()} >
                        <Text style={StyleIdeia.numComentCurti}> {this.state.qtdCurtidas}</Text>
                    </Icon>
                    <Icon name='comment' style={StyleIdeia.iconComentario} size={19} color={EstiloComum.cores.fundoWeDo} onPress={this.props.onPressComentario} >
                        <Text style={StyleIdeia.numComentCurti}> {qtdComentario}</Text>
                    </Icon>
                </View>
                <TouchableOpacity style={StyleIdeia.interesse} onPress={() => this.interesse()}>
                    {this.renderInteresse()}
                </TouchableOpacity>
                <AddComentario />
            </View>
        )
    }
}

export default Ideia