/**
 * Componente que redeinar o campo de adicionar novos comentarios 
 */
import React, { Component } from 'react'
import { View, TextInput, TouchableWithoutFeedback, Alert,ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyleAddComentario from './StyleAddComentario'

class AddComentario extends Component {
    state = {
        comentario: '',
    }

    AdicionarComentario = () => {
        if(this.state.comentario.trim().length != 0){
            let data = this.state.comentario
            this.props.adicionarComentario(data)
            this.setState({comentario: ''})
        }else{
            ToastAndroid.show('Insira um comentário válido', ToastAndroid.SHORT);
            this.setState({comentario: ''})
        }
    }

    render() {
        return (
            <View style={StyleAddComentario.container}>
                <TextInput placeholder='Digite o comentário'
                    style={StyleAddComentario.input} autoFocus={false}
                    value={this.state.comentario}
                    onChangeText={(comentario) => this.setState({ comentario })}
                    onSubmitEditing={this.AdicionarComentario} />
                <TouchableWithoutFeedback onPress={this.AdicionarComentario}>
                    <Icon name='paper-plane' style={StyleAddComentario.icone} size={20} />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

export default AddComentario