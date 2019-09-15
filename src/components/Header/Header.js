/**
 * Componente que redeniza o Header das paginas que o usuario vera após a autenticação
 */
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import StyleHeader from './StyleHeader'
import EstiloComum from '../../EstiloComum'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Api from '../../api/Api'

const tecnologias = []

export default class Header extends Component {

    state = {
        pesquisa: false,
        pesquisaTec: false,
        tecnologiaSelect: [],
        textoPesquisa: '',
    }

    componentDidMount = async () => {
        await this.buscaTecnologias()
    }

    /**
     * Busca da API as tecnologias para exibir no Multiselect
    */
    buscaTecnologias = async () => {
        if (tecnologias.length === 0) {
            try {
                await Api.get('/tecnologia')
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
     * Função que verifica se o maximo de tecnologia ja foi selecionado para pesquisa
    */
    selecionarTecnologias = (tecnologiaSelect) => {
        if (tecnologiaSelect.length > 1) {
            return
        }

        this.setState({ tecnologiaSelect })
    }

    /**
     * Exibe a barra de pesquisa caso o usuario clique sobre o icone de lupa,
     * caso o state esteja true ele apenas esconde o input e caso ao contraio 
     * espera receber uma função para reelizar a busca
    */
    onPressPesquisa = () => {
        this.setState({ pesquisa: true })
        this.props.trocarPagina()
    }

    /**
     * Verifica se foi passado algum texto ou tecnologia e manda os dados para tela de pesquisa
    */
    realizarPesquisa = () => {
        if (this.state.textoPesquisa.length > 0 || this.state.tecnologiaSelect) {
            let data = this.state
            this.props.trocarPagina(data)
        }
    }


    render() {
        return (
            <View style={StyleHeader.container}>
                {this.props.paginaInicial &&
                    <View style={StyleHeader.rowContainer}>
                        <TouchableOpacity onPress={this.props.onPressImage} >
                            <Image source={this.props.image} style={StyleHeader.image} />
                        </TouchableOpacity>
                        <Text style={StyleHeader.title}>{this.props.texto}</Text>
                        <TouchableOpacity onPress={() => this.onPressPesquisa()}>
                            <Icon name={this.props.icon} size={25} style={StyleHeader.icon} />
                        </TouchableOpacity>
                    </View>
                }
                {this.props.ScreenPesquisa && !this.props.paginaInicial &&
                    <View style={[StyleHeader.rowContainer, { height: 50 }]}>
                        <TouchableOpacity onPress={() => this.props.voltarTela()} >
                            <Icon name={'arrow-left'} size={25} />
                        </TouchableOpacity>
                        <TextInput style={StyleHeader.inputPesquisa} value={this.state.textoPesquisa}
                            placeholder="Escreva algo para pesquisar"
                            onChangeText={textoPesquisa => this.setState({ textoPesquisa })}
                            onSubmitEditing={() => this.realizarPesquisa()}
                            autoFocus={true} />
                        <View style={StyleHeader.inputTec}>
                            <SectionedMultiSelect
                                colors={{ primary: EstiloComum.cores.fundoWeDo }}
                                showDropDowns={false}
                                readOnlyHeadings={true}
                                showChips={false}
                                placeholder="Tecnologia"
                                uniqueKey="id_tecnologia"
                                subKey="tecnologias"
                                displayKey='nm_tecnologia'
                                selectText='Tecnologia'
                                confirmText='Confirmar'
                                searchPlaceholderText='Pesquisar Tecnologias'
                                selectedText='Selecionada'
                                items={tecnologias}
                                onSelectedItemsChange={this.selecionarTecnologias}
                                selectedItems={this.state.tecnologiaSelect} />
                        </View>

                    </View>
                }
                {!this.props.paginaInicial && !this.props.ScreenPesquisa &&
                    <View style={StyleHeader.rowContainer2}>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Icon name={this.props.icon} size={30} color={EstiloComum.cores.fundoWeDo} style={StyleHeader.icon2} />
                        </TouchableOpacity>
                        <Text style={StyleHeader.title2}>{this.props.texto}</Text>
                    </View>
                }
            </View>
        )
    }
}