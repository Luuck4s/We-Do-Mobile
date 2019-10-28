import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StyleComentarios from './StyleComentarios'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Comentarios extends Component {

    state = {
        maximo: 0,
        verMais: true,
    }

    componentDidMount = () => {
        let metade_qtd_comentario = Math.ceil(this.props.comentarios.length / 2)

        this.setState({
            maximo: metade_qtd_comentario
        })
    }

    componentDidUpdate(PrevProps, PrevState) {
        if (this.props.idIdeia !== PrevProps.idIdeia) {
            let metade_qtd_comentario = Math.ceil(this.props.comentarios.length / 2)

            this.setState({
                maximo: metade_qtd_comentario,
                verMais: true
            })
        }
    }

    visualizarMais = () => {
        this.setState(
            {
                maximo: this.props.comentarios.length,
                verMais: false
            }
        )
    }

    render() {
        let view = null
        let comentarios = 0
        let iconeExibido = false
        if (this.props.comentarios) {
            view = this.props.comentarios.map((item, index) => {
                comentarios++
                if (comentarios <= this.state.maximo) {
                    var id_mensagem = item.id_mensagem
                    if (item.id_usuario === this.props.idUsuario) {
                        donoComentario = true
                    }
                    return (
                        <View style={StyleComentarios.containerComentarios} key={index}>
                            <Text style={StyleComentarios.nomeUsuario}>{item.nm_usuario}</Text>
                            <Text style={StyleComentarios.comentarios}>{item.ct_mensagem}</Text>
                            {this.props.donoIdeia &&
                                <TouchableOpacity onPress={() => this.props.apagarComentario(id_mensagem)}>
                                    {iconeExibido = true}
                                    <Icon name="trash" size={20} style={StyleComentarios.iconTrash} />
                                </TouchableOpacity>
                            }
                            {item.id_usuario == this.props.idUsuario && iconeExibido != true &&
                                <TouchableOpacity onPress={() => this.props.apagarComentario(id_mensagem)}>
                                    <Icon name="trash" size={20} style={StyleComentarios.iconTrash} />
                                </TouchableOpacity>
                            }
                            <Text style={StyleComentarios.dataComentario}>postado {moment(`${item.hr_mensagem}`, 'YYYY-MM-DD hh:mm:ss').fromNow()}</Text>
                            {comentarios == this.state.maximo && this.props.comentarios.length != 1 && this.state.verMais &&
                                <TouchableOpacity onPress={() => this.visualizarMais()}>
                                    <Text style={StyleComentarios.visualizarMais}>Ver Mais</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    )
                }
            })
        }

        return (
            <View style={StyleComentarios.container}>
                {view}
                {this.props.comentarios.length == 0 &&
                    <Text style={StyleComentarios.textNoComentarios}>Está ideia ainda não tem comentarios.</Text>
                }
            </View>
        )
    }
}