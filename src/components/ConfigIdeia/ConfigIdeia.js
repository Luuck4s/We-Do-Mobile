import React, { Component } from 'react'
import { View, Text, Picker, TouchableOpacity, Alert, ToastAndroid, Modal, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import StyleConfigIdeia from './StyleConfigIdeia'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Tags from '../../components/Tags/Tags'

export default class ConfigIdeia extends Component {

    state = {
        status_antigo: this.props.status_ideia,
        novoStatus: this.props.status_ideia,
        membros: [],
        novoDonoIdeia: 0,
        textTag: '',
        tagsNovas: [],
        tagsAntigas: []
    }


    componentDidMount() {
        if (this.props.membros) {
            this.separarMembros()
        }

        if (this.props.tags) {
            let tags = []

            this.props.tags.map((item, index) => {
                tags.push(item.nm_tag)
            })

            this.setState({ tagsAntigas: tags })
        }
    }

    componentDidUpdate(PrevProps, PrevStates) {
        if (this.props.status_ideia != PrevProps.status_ideia) {

            this.setState({ status_antigo: this.props.status_ideia, novoStatus: this.props.status_ideia })

            if (this.props.membros) {
                this.separarMembros()
            }

            if (this.props.tags) {
                let tags = []

                this.props.tags.map((item, index) => {
                    tags.push(item.nm_tag)
                })

                this.setState({ tagsAntigas: tags })
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
        } else if (this.state.tagsNovas.length > 0) {
            Alert.alert(
                'Confirmação',
                `Tem certeza que adicionar as novas tags a sua ideia ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ tagsNovas: [], textTag: '' })
                    },
                    {
                        text: 'Confirmar', onPress: () => this.adicionarNovasTags()
                    }
                ]
            )
        } else {
            this.props.onCancel()
        }
    }


    criarTag = () => {
        if (this.state.textTag.trim().length > 0) {
            if (!this.state.tagsAntigas.includes(this.state.textTag.trim()) && !this.state.tagsNovas.includes(this.state.textTag.trim())) {
                Alert.alert(
                    'Confirmação',
                    `Deseja adicionar a tag ${this.state.textTag.trim()}`,
                    [
                        {
                            text: 'Cancelar', onPress: () => this.setState({ textTag: '' })
                        },
                        {
                            text: 'Confirmar', onPress: () => this.adicionarTag()
                        }
                    ]
                )
            } else {
                this.setState({ textTag: '' })
                ToastAndroid.show('Tag já existe na ideia', ToastAndroid.SHORT);
            }
        }
    }

    cancelar = () => {
        this.setState({ novoStatus: 0, textTag: '', tagsNovas: [], novoDonoIdeia: 0 })
        this.props.onCancel()
    }

    renderTags = () => {
        let tags = this.state.tagsNovas
        let render = tags.map((item, index) => {
            return <View style={StyleConfigIdeia.containerTags2} key={index}>
                <Icon name={'tag'} size={10} style={StyleConfigIdeia.iconTag} />
                <Text style={StyleConfigIdeia.tagNova}>{item}</Text>
            </View>
        })

        return render
    }

    adicionarTag = () => {
        let tagsExistentes = this.state.tagsNovas
        tagsExistentes.push(this.state.textTag.trim())
        this.setState({ tagsNovas: tagsExistentes, textTag: '' })
        this.renderTags()
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

    adicionarNovasTags = () => {
        this.props.adicionarNovasTags(this.state.tagsNovas)
        this.setState({ tagsNovas: [], textTag: '' })
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
                        <ScrollView style={{marginBottom: -5}}>
                            <Tags tags={this.props.tags} />
                        </ScrollView>
                    </View>
                    <TextInput style={StyleConfigIdeia.inputTag} value={this.state.textTag}
                        autoCorrect={false}
                        maxLength={20}
                        placeholder="Digite uma nova tag"
                        autoFocus={false} onChangeText={textTag => this.setState({ textTag })}
                        onKeyPress={(event) => {
                            if (event.nativeEvent.key == " ") {
                                this.criarTag()
                            }
                        }} />
                    {this.state.tagsNovas.length > 0 &&
                        <View style={StyleConfigIdeia.containerTags}>
                            <Text style={StyleConfigIdeia.textTagsNovas}>Tags novas</Text>
                            <ScrollView>
                                <View style={StyleConfigIdeia.tagsNovas}>
                                    {this.renderTags()}
                                </View>
                            </ScrollView>
                        </View>
                    }
                    <View style={StyleConfigIdeia.containerButton}>
                        <TouchableOpacity style={StyleConfigIdeia.buttonCancelar} onPress={() => this.cancelar()}>
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