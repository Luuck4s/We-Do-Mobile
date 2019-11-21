import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Alert, ToastAndroid, Modal, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyleDenuncia from './StyleDenuncia'
import EstiloComum from '../../EstiloComum'

export default class Denuncia extends Component {

    state = {
        textDenuncia: ''
    }

    componentDidMount = async () => {

    }


    confirmarDenuncia = () => {
        if(this.state.textDenuncia.trim() != ""){
            Alert.alert(
                'Confirmação',
                `Tem certeza que deseja adicionar está denúncia ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ textDenuncia: '' })
                    },
                    {
                        text: 'Confirmar', onPress: () => this.adicionarDenuncia()
                    }
                ]
            )
        }
    }

    adicionarDenuncia = async () => {
        await this.props.denunciar(this.state.textDenuncia)
        this.cancelar()
    }

    cancelar = () => {
        this.setState({ textDenuncia: '' })
        this.props.onCancel()
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={StyleDenuncia.offset}></View>
                </TouchableWithoutFeedback>
                <View style={StyleDenuncia.container}>
                    <ScrollView style={{ width: '100%', paddingBottom: 80 }}>
                        <Text style={StyleDenuncia.title}>Denunciar Usuário</Text>
                        <View style={StyleDenuncia.novaDenuncia}>
                            <TextInput style={StyleDenuncia.inputDenuncia} value={this.state.textDenuncia}
                                autoCorrect={true}
                                maxLength={150}
                                multiline={true}
                                placeholder="Escreva sua denúncia"
                                autoFocus={false}
                                onChangeText={textDenuncia => this.setState({ textDenuncia })} />
                        </View>
                        <View style={StyleDenuncia.containerButton}>
                            <TouchableOpacity style={StyleDenuncia.buttonCancelar} onPress={() => this.cancelar()}>
                                <Text style={StyleDenuncia.textButton}>Cancelar</Text>
                                <Icon name='times' size={20} style={StyleDenuncia.iconeButton} />
                            </TouchableOpacity>
                            <TouchableOpacity style={StyleDenuncia.button} onPress={() => this.confirmarDenuncia()}>
                                <Text style={StyleDenuncia.textButton}>Pronto</Text>
                                <Icon name='check' size={20} style={StyleDenuncia.iconeButton} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={StyleDenuncia.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

