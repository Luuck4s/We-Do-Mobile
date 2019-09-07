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

class Header extends Component {

    state = {
        pesquisa: false,
        pesquisaTec: false,
        tecnologiaSelect: []
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
     * Exibe a barra de pesquisa caso o usuario clique sobre o icone de lupa,
     * caso o state esteja true ele apenas esconde o input e caso ao contraio 
     * espera receber uma função para reelizar a busca
    */
    onPressPesquisa = () => {
        if (this.state.pesquisa) {
            this.setState({ pesquisa: false, pesquisaTec: false })
        } else {
            this.setState({ pesquisa: true })
            this.props.onPressPesquisa()
        }
    }

    /**
     * Realiza a exibição do select caso o usuario clique sobre o icone
    */
    onPressPesquisaTec = () => {
        this.setState({ pesquisaTec: true })
    }

    render() {
        return (
            <View style={StyleHeader.container}>
                {this.props.paginaInicial && !this.state.pesquisa &&
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
                {this.props.paginaInicial && this.state.pesquisa &&
                    <View style={[StyleHeader.rowContainer, { height: 50 }]}>
                        <TouchableOpacity onPress={() => this.onPressPesquisa()} >
                            <Icon name={'long-arrow-alt-left'} size={25} />
                        </TouchableOpacity>
                        <TextInput style={StyleHeader.inputPesquisa} placeholder="Escreva algo para pesquisar" />
                        {!this.state.pesquisaTec &&
                            <TouchableOpacity onPress={() => this.onPressPesquisaTec()} style={StyleHeader.iconTec} >
                                <Icon name='code' size={20} />
                            </TouchableOpacity>
                        }
                        {this.state.pesquisaTec &&
                            <View style={StyleHeader.inputTec}>
                                <SectionedMultiSelect
                                    colors={{ primary: EstiloComum.cores.fundoWeDo }}
                                    showDropDowns={false}
                                    readOnlyHeadings={true}
                                    showChips={false}
                                    single={true}
                                    placeholder="Tecnologia"
                                    uniqueKey="id_tecnologia"
                                    subKey="tecnologias"
                                    displayKey='nm_tecnologia'
                                    selectText='Tecnologia'
                                    confirmText='Confirmar'
                                    searchPlaceholderText='Pesquisar Tecnologias'
                                    selectedText='Selecionada'
                                    items={tecnologias}
                                    onSelectedItemsChange={(tecnologia) => this.setState({ tecnologiaSelect: tecnologia })}
                                    selectedItems={this.state.tecnologiaSelect} />
                            </View>
                        }
                    </View>
                }
                {!this.props.paginaInicial &&
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


export default Header