import React, { Component } from 'react'
import { View, Text, Picker, TouchableOpacity, Alert, ToastAndroid, TouchableWithoutFeedback, Modal, ScrollView, TextInput } from 'react-native'
import StyleConfigIdeia from './StyleConfigIdeia'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Tags from '../../components/Tags/Tags'

export default class ConfigIdeia extends Component {

    state = {
        status_antigo: this.props.status_ideia,
        novoStatus: this.props.status_ideia,
        membros: [],
        novoDonoIdeia: 0,
        textTag: ''
    }


    componentDidMount() {
        if (this.props.membros) {
            this.separarMembros()
        }
    }

    componentDidUpdate(PrevProps, PrevStates) {
        if (this.props.status_ideia != PrevProps.status_ideia) {

            this.setState({ status_antigo: this.props.status_ideia, novoStatus: this.props.status_ideia })

            if (this.props.membros) {
                this.separarMembros()
            }
        }
    }

    confirmarMudanca = () => {
        if (this.state.novoStatus != this.state.status_antigo) {
            Alert.alert(
                'Confirmação',
                `Tem certeza que deseja mudar o status da ideia ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ novoStatus: this.props.status_ideia })
                    },
                    {
                        text: 'Confirmar', onPress: () => this.save()
                    }
                ]
            )
        } else if (this.state.novoDonoIdeia != 0) {
            Alert.alert(
                'Confirmação',
                `Tem certeza que deseja passar a ideia para outro usuário ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ novoDonoIdeia: 0 })
                    },
                    {
                        text: 'Confirmar', onPress: () => this.passarIdeia()
                    }
                ]
            )
        } else {
            this.props.onCancel()
        }
    }

    criarTag = () => {
        if (this.state.textTag.trim().length > 0) {
            Alert.alert(
                'Confirmação',
                `Deseja adicionar a tag ${this.state.textTag}`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ textTag: '' })
                    },
                    {
                        text: 'Confirmar', onPress: () => this.adicionarTag()
                    }
                ]
            )
        }
    }

    adicionarTag = () => {
        alert(this.state.textTag)
        this.setState({ textTag: '' })
    }

    passarIdeia = () => {
        this.props.passarIdeia(this.state.novoDonoIdeia)
        this.setState({ novoDonoIdeia: 0 })
        this.props.onCancel()
    }

    save = () => {

        this.props.mudarStatus(this.state.novoStatus)
        this.setState({ novoStatus: this.props.status_ideia })
        this.props.onCancel()
    }

    separarMembros = () => {
        let membros = []
        this.props.membros.map((item, index) => {
            if (item.idealizador != 1) {
                membros.push(<Picker.Item key={index} label={`${item.nm_usuario}`} value={item.id_usuario} />)
            }
        })

        this.setState({ membros })
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
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
                    <View style={StyleConfigIdeia.containerStatus}>
                        <Text style={StyleConfigIdeia.titleStatus}>Passar a ideia</Text>
                        {this.state.membros &&
                            <Picker
                                onValueChange={(itemValue, itemIndex) => this.setState({ novoDonoIdeia: itemValue })}
                                selectedValue={this.state.novoDonoIdeia}>
                                <Picker.Item label="Selecione alguem" value={0} />
                                {this.state.membros}
                            </Picker>
                        }
                    </View>
                    <View style={StyleConfigIdeia.containerTags}>
                        <Text style={StyleConfigIdeia.titleTags}>Tags da ideia</Text>
                        <ScrollView>
                            <Tags tags={this.props.tags} />
                        </ScrollView>
                    </View>
                    <TextInput style={StyleConfigIdeia.inputTag} value={this.state.textTag}
                        autoCorrect={false}
                        placeholder="Adicione mais tags"
                        autoFocus={false} onChangeText={textTag => this.setState({ textTag })}
                        onKeyPress={(event) => {
                            if (event.nativeEvent.key == " ") {
                                this.criarTag()
                            }
                        }} />
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
            </Modal>
        )
    }
}