import React, { Component } from 'react'
import { View, TextInput, TouchableWithoutFeedback, Alert, ToastAndroid, Modal, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyleAdicionarTecnologia from './StyleAdicionarTecnologia'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import EstiloComum from '../../EstiloComum'
import Api from '../../api/Api'

var tecnologias = []

export default class AdicionarTecnologia extends Component {
    state = {
        novaTec: [],
    }

    componentDidMount = async () => {
        await this.buscaTecnologias()
    }


    buscaTecnologias = async () => {
        if (tecnologias.length == 0) {
            try {
                await Api.get('/tecnologia')
                    .then((response) => {
                        tecnologias.push(response.data)
                    })
            } catch (error) { }
        }
    }

    confirmarAddTec = () => {
        Alert.alert(
            'Confirmação',
            `Tem certeza que deseja adicionar a tecnologia a ideia ?`,
            [
                {
                    text: 'Cancelar', onPress: () => this.setState({ novoStatus: this.props.status_ideia })
                },
                {
                    text: 'Confirmar', onPress: () => this.adicionarnovaTec()
                }
            ]
        )
    }

    adicionarnovaTec = ()  =>{
        this.props.adicionarnovaTec(this.state.novaTec)
        this.setState({novaTec: []})
        this.props.onCancel()
    }

    selecionarTecnologias = (novaTec) => {
        this.setState({ novaTec })
        this.confirmarAddTec()
    }
    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <View style={StyleAdicionarTecnologia.container}>
                    <View style={StyleAdicionarTecnologia.containerTecnologias}>
                        <ScrollView>
                            <SectionedMultiSelect
                                colors={{ primary: EstiloComum.cores.fundoWeDo }}
                                showDropDowns={false}
                                single={true}
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
                </View>
            </Modal>
        )
    }
}

