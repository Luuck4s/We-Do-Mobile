import React, { Component } from 'react'
import { View, Text, Picker, TouchableOpacity, Alert, ToastAndroid, TouchableWithoutFeedback, Modal } from 'react-native'
import StyleConfigIdeia from './StyleConfigIdeia'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ConfigIdeia extends Component {

    state = {
        status_antigo: this.props.status_ideia,
        novoStatus: this.props.status_ideia
    }

    componentDidUpdate(PrevProps, PrevStates) {
        if (this.props.status_ideia != PrevProps.status_ideia) {

            this.setState({ status_antigo: this.props.status_ideia, novoStatus: this.props.status_ideia })
        }
    }

    confirmarMudanca = () => {
        if (this.state.novoStatus != this.state.status_antigo) {
            Alert.alert(
                'Confirmação',
                `Tem certeza que deseja mudar o status da ideia ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => false
                    },
                    {
                        text: 'Confirmar', onPress: () => this.save()
                    }
                ]
            )
        }
    }

    save = () => {

        this.props.mudarStatus(this.state.novoStatus)
        this.setState({ novoStatus: this.props.status_ideia })
        this.props.onCancel()
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={StyleConfigIdeia.offset}></View>
                </TouchableWithoutFeedback>
                <View style={StyleConfigIdeia.container}>
                    <Text style={StyleConfigIdeia.title}>Configurações da Ideia</Text>
                    <View style={StyleConfigIdeia.containerStatus}>
                        <Text style={StyleConfigIdeia.titleStatus}>Status da Ideia</Text>
                        <Picker
                            onValueChange={(itemValue, itemIndex) => this.setState({ novoStatus: itemValue })}
                            selectedValue={this.state.novoStatus}>
                            <Picker.Item label="Aberta à participações" value={0} />
                            <Picker.Item label="Em desenvolvimento" value={1} />
                            <Picker.Item label="Ideia concluida" value={2} />
                        </Picker>
                    </View>
                    <View style={StyleConfigIdeia.containerButton}>
                        <TouchableOpacity style={StyleConfigIdeia.buttonCancelar} onPress={() => this.props.onCancel()}>
                            <Text style={StyleConfigIdeia.textButton}>Cancelar</Text>
                            <Icon name='times' size={20} style={StyleConfigIdeia.iconeButton} />
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleConfigIdeia.button} onPress={() => this.confirmarMudanca()}>
                            <Text style={StyleConfigIdeia.textButton}>Pronto</Text>
                            <Icon name='check' size={20} style={StyleConfigIdeia.iconeButton} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={StyleConfigIdeia.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}