/**
 * Componente que redeinar o campo de adicionar novos comentarios 
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import EstiloComum from '../EstiloComum'

class AddComentario extends Component {
    state = {
        comentario: '',
    }

    AdicionarComentario = () => {
        Alert.alert('Adicionado', `${this.state.comentario}`)
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput placeholder='Digite o comentário'
                    style={styles.input} autoFocus={false}
                    value={this.state.comentario}
                    onChangeText={(comentario) => this.setState({ comentario })}
                    onSubmitEditing={this.AdicionarComentario} />
                <TouchableWithoutFeedback onPress={this.AdicionarComentario}>
                    <Icon name='paper-plane' size={20} color={EstiloComum.cores.fundoWeDo}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 0.4,
        borderColor: '#000',
        borderRadius: 7,
    },
    legenda: {
        marginLeft: 10,
        fontSize: 12,
        color: '#000'
    },
    input: {
        width: '90%'
    },
    icon: {
        marginLeft: '70%',
    }
})

export default AddComentario