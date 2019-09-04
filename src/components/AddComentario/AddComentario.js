/**
 * Componente que redeinar o campo de adicionar novos comentarios 
 */
import React, { Component } from 'react'
import { View, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyleAddComentario from './StyleAddComentario'

class AddComentario extends Component {
    state = {
        comentario: '',
    }

    AdicionarComentario = () => {
        if(this.state.comentario.length != 0){
            Alert.alert('Adicionado', `${this.state.comentario}`)
        }else{
            return false
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