import React, { Component } from 'react'
import { View, Modal, Text, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Api from '../api/Api'
import EstiloComum from '../EstiloComum'

const initialState = {
    titulo: '',
    desc: '',
    tecnologias: [],
    maximoTecnologia: false,
}

const tecnologias = []

export default class AddIdeia extends Component {
    state = { ...initialState }

    componentDidMount = () => {
        this.buscaTecnologias()
    }

    /**
     * 
    */
    save = () => {
        if (!this.state.titulo.trim()) {
            Alert.alert('Titulo Invalido', 'Informe um Titulo para a ideia!')

            return
        }
        if (!this.state.desc.trim()) {
            Alert.alert('Descrição Invalida', 'Informe uma descrição para a ideia!')

            return
        }

        const data = { ...this.state }
        this.props.adicionarIdeia(data)
        this.setState({ ...initialState })
    }

    /**
     * 
    */
    buscaTecnologias = async () => {
        try {
            Api.get('/tecnologia')
                .then((response) => {
                    tecnologias.push(response.data)
                }).catch(function (err) {
                    Alert.alert("Erro Tecnologias", `Ocorreu um erro inesperado ${err}`)
                })
        } catch (error) {
            Alert.alert("Erro Tecnologias", `Ocorreu um erro inesperado ${error.data}`)
        }
    }

    /**
     * 
    */
    selecionarTecnologia = (tecnologias) => {
        if (tecnologias.length >= 10) {
            if (tecnologias.length === 10) {
                this.setState({ tecnologias })
            }
            this.setState({
                maximoTecnologia: true,
            })
            return
        }
        this.setState({
            maximoTecnologia: false,
        })

        this.setState({ tecnologias })

    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='fade' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Adicionar uma ideia</Text>
                    <TextInput placeholder="Titulo Ideia" style={styles.input}
                        onChangeText={titulo => this.setState({ titulo })}
                        value={this.state.titulo} />
                    <TextInput placeholder="Descrição" style={[styles.input,{height: 50}]}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} multiline={true} />
                    <SectionedMultiSelect style={styles.inputTec}
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
                        onSelectedItemsChange={this.selecionarTecnologia}
                        selectedItems={this.state.tecnologias} />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.button} onPress={this.save}>
                            <Text style={styles.textButton}>Pronto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#FFF',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    button: {
        margin: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        height: 40,
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    header: {
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#000'
    },
    input: {
        width: '90%',
        height: 35,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.4,
    },
    inputTec: {
        height: 'auto',
        width: 'auto', 
        padding: -5
    },
    textButton: {
        marginTop: '9%',
        color: 'white'
    }
})