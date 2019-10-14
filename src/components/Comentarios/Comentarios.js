import React,{Component} from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import StyleComentarios from './StyleComentarios'
import moment from 'moment'
import 'moment/locale/pt-br'

export default class Comentarios extends Component{

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

    visualizarMais = () => {
        this.setState(
            {
                maximo: this.props.comentarios.length,
                verMais: false
            }
        )
    }

    render(){
        let view = null
        let comentarios = 0

        if(this.props.comentarios){
            view = this.props.comentarios.map((item,index) => {
                comentarios++

                if(comentarios <= this.state.maximo){
                    return(
                        <View style={StyleComentarios.containerComentarios} key={index}>
                            <Text style={StyleComentarios.nomeUsuario}>{item.nm_usuario}</Text>
                            <Text style={StyleComentarios.comentarios}>{item.ct_mensagem}</Text>
                            <Text style={StyleComentarios.dataComentario}>postado {moment(`${item.hr_mensagem}`,'YYYY-MM-D h:mm:ss').fromNow()}</Text>
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

        return(
            <View style={StyleComentarios.container}>
                {view}
            </View>
        )
    }
}