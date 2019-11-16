import React, { Component } from 'react'
import { View, Modal, Text, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import StylesAddIdeia from './StylesAddIdeia'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Api from '../../api/Api'
import EstiloComum from '../../EstiloComum'

const tecnologias = []

export default class AddIdeia extends Component {

    constructor(props){
        super(props)
    }

    state = {
        titulo: '',
        desc: '',
        tecnologiasIdeia: [],
        tagsIdeia: [],
        maximoTecnologia: false,
    }

    componentDidMount = async () => {
        await this.buscaTecnologias()
    }

    /**
     * Cria as tag a partir do titulo
    */
    criarTagsTitulo = async () => {
        let tituloDaIdeia = this.state.titulo
        let splitTituloDaIdeia = tituloDaIdeia.split(" ")
        let tagsDaIdeia = []

        for (let i = 0; i < splitTituloDaIdeia.length; i++) {
            if (splitTituloDaIdeia[i].length > 2) {
                tagsDaIdeia.push(splitTituloDaIdeia[i])
            }
        }

        this.setState({ tagsIdeia: tagsDaIdeia })
    }

    /**
     * Função que verifica os campos do componente e caso esteja tudo preenchido 
     * espera recever por props uma função de add a ideia
    */
    save = async () => {
        if (!this.state.titulo.trim()) {
            ToastAndroid.show(`Informe um Titulo para a ideia!`, ToastAndroid.SHORT) 
            return 
        } 
        
        if (!this.state.desc.trim()) { 
            ToastAndroid.show(`Informe uma descrição para a ideia!`, ToastAndroid.SHORT) 
            return 
        }
        
        if (!this.state.tecnologiasIdeia){
            ToastAndroid.show(`Insira tecnologias na sua ideia!`, ToastAndroid.SHORT) 
            return 
        }

        await this.criarTagsTitulo() 
        const data = { ...this.state } 
        this.props.adicionarIdeia(data) 
        this.setState({ titulo: '', desc: '', tecnologiasIdeia: [], maximoTecnologia: false, tagsIdeia: [] })
    }

	/**
	 * Função que através da API busca e armazena as tecnologias que 
	 * o usuário podera escolher.
	 */
    buscaTecnologias = async () => {
        if (tecnologias.length === 0) {
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
    }

    /**
     * Verifica quantas tecnologias ja foram selecionadas e
     * caso passe de 20 nao permite mais selecionar elas
    */
    selecionarTecnologia = (tecnologiasIdeia) => {
        if (tecnologiasIdeia.length > 20) {
            this.setState({
                maximoTecnologia: true,
            })
            return
        }
        this.setState({
            maximoTecnologia: false,
        })
        this.setState({ tecnologiasIdeia })
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={false}>
                <TouchableOpacity onPress={() => this.props.onCancel()}>
                    <Icon name={'times-circle'} style={StylesAddIdeia.icone} size={30} />
                    <Text style={StylesAddIdeia.header}>Adicionar uma ideia</Text>
                </TouchableOpacity>
                <View style={StylesAddIdeia.container}>
                    <TextInput placeholder="Titulo da Ideia" style={StylesAddIdeia.input}
                        onChangeText={titulo => this.setState({ titulo })}
                        value={this.state.titulo} maxLength={50} />
                    <TextInput placeholder="Descrição" style={StylesAddIdeia.inputDesc}
                        maxLength={255}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} multiline={true} />
                    <View style={StylesAddIdeia.containerTec}>
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
                                onSelectedItemsChange={this.selecionarTecnologia}
                                selectedItems={this.state.tecnologiasIdeia} />
                        </ScrollView>
                    </View>
                    <View style={StylesAddIdeia.containerButton}>
                        <TouchableOpacity style={StylesAddIdeia.button} onPress={this.save}>
                            <Text style={StylesAddIdeia.textButton}>Pronto</Text>
                            <Icon name='check' size={20} style={StylesAddIdeia.iconeButton} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}