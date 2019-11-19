import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Alert, ToastAndroid, Modal, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyleAdicionarTecnologiaPerfil from './StyleAdicionarTecnologia'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import EstiloComum from '../../EstiloComum'
import Api from '../../api/Api'

var tecnologias = []

export default class AdicionarTecnologiaPerfil extends Component {
    state = {
        novaTec: [],
        mudanca: 0,
    }

    componentDidMount = async () => {
        if (this.props.tecnologias) {
            let data = []

            this.props.tecnologias.map((item, index) => {
                data.push(item.id_tecnologia)
            })

            this.setState({ novaTec: data })
        }

        await this.buscaTecnologias()
    }

    popularSelect = () => {
        if (this.props.tecnologias) {
            let data = []

            this.props.tecnologias.map((item, index) => {
                data.push(item.id_tecnologia)
            })

            this.setState({ novaTec: data })
        }
    }

    componentDidUpdate = async (PrevProps, PrevState) => {
        if (PrevProps.tecnologias) {
            if (PrevProps.tecnologias != this.props.tecnologias) {
                let data = []

                this.props.tecnologias.map((item, index) => {
                    data.push(item.id_tecnologia)
                })

                this.setState({ novaTec: data })
            }
        }
    }

    buscaTecnologias = async () => {
        if (tecnologias.length == 0) {
            await Api.get('/tecnologia')
                .then((response) => {
                    tecnologias.push(response.data)
                })
        }
    }

    confirmarAddTec = () => {
        if (this.state.mudanca == 1) {
            Alert.alert(
                'Confirmação',
                `Tem certeza que deseja confirmar a mudanças em suas preferências  ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ mudanca: 0 }, this.popularSelect())
                    },
                    {
                        text: 'Confirmar', onPress: () => this.adicionarnovaTec()
                    }
                ]
            )
        } else {
            this.props.onCancel()
        }
    }

    cancelar = () => {
        this.setState({ mudanca: 0 }, this.popularSelect())
        this.props.onCancel()
    }

    adicionarnovaTec = () => {
        this.props.adicionarnovaTec(this.state.novaTec)
        this.setState({ mudanca: 0 }, this.popularSelect())
        this.props.onCancel()
    }

    selecionarTecnologias = async (novaTec) => {
        await this.setState({ novaTec, mudanca: 1 })
    }
    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={StyleAdicionarTecnologiaPerfil.offset}></View>
                </TouchableWithoutFeedback>
                <View style={StyleAdicionarTecnologiaPerfil.container}>
                    <Text style={StyleAdicionarTecnologiaPerfil.title}>Adicionar Tecnologias</Text>
                    <View style={StyleAdicionarTecnologiaPerfil.containerTecnologias}>
                        <ScrollView>
                            <SectionedMultiSelect
                                colors={{ primary: EstiloComum.cores.fundoWeDo }}
                                showDropDowns={false}
                                readOnlyHeadings={true}
                                placeholder="Tecnologias"
                                uniqueKey="id_tecnologia"
                                subKey="tecnologias"
                                displayKey='nm_tecnologia'
                                selectText='Tecnologias'
                                confirmText='Confirmar'
                                searchPlaceholderText='Pesquisar Tecnologias'
                                selectedText='Selecionadas'
                                items={tecnologias}
                                onSelectedItemsChange={novaTec => this.selecionarTecnologias(novaTec)}
                                selectedItems={this.state.novaTec} />
                        </ScrollView>
                    </View>
                    <View style={StyleAdicionarTecnologiaPerfil.containerButton}>
                        <TouchableOpacity style={StyleAdicionarTecnologiaPerfil.buttonCancelar} onPress={() => this.cancelar()}>
                            <Text style={StyleAdicionarTecnologiaPerfil.textButton}>Cancelar</Text>
                            <Icon name='times' size={20} style={StyleAdicionarTecnologiaPerfil.iconeButton} />
                        </TouchableOpacity>
                        <TouchableOpacity style={StyleAdicionarTecnologiaPerfil.button} onPress={() => this.confirmarAddTec()}>
                            <Text style={StyleAdicionarTecnologiaPerfil.textButton}>Pronto</Text>
                            <Icon name='check' size={20} style={StyleAdicionarTecnologiaPerfil.iconeButton} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={StyleAdicionarTecnologiaPerfil.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

