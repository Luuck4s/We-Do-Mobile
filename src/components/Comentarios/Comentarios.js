import React,{Component} from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import StyleComentarios from './StyleComentarios'
import moment from 'moment'
import 'moment/locale/pt-br'

export default class Comentarios extends Component{

    state = {
        maximo: this.props.comentarios.length - 3,
        verMais: true,
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
                            <Text style={StyleComentarios.dataComentario}>postado em {moment(`${item.hr_mensagem}`).format('D/MM/YYYY')}</Text>
                            {this.state.maximo === comentarios && this.state.verMais &&
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