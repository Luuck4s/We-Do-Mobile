import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Header from '../../components/Header/Header'
import AsyncStorage from '@react-native-community/async-storage'
import StylePerfil from './StylePerfil'
import Icon from 'react-native-vector-icons/FontAwesome5'
import InformacoesUsuario from '../../components/InformacoesUsuario/InformacoesUsuario'
import ComponetPortfolio from '../../components/ComponentPortifolio/ComponentPortfolio'

let ideias = [
    {
        "id_ideia": 12,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 122,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 122,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 1232,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 312,
        "nm_ideia": "Teste"
    },
    {
        "id_ideia": 312,
        "nm_ideia": "Teste"
    }
]

let tecnologias = [
    {
        "id_tecnologia": 8,
        "nm_tecnologia": "JavaScript"
    }
]

export default class Perfil extends Component {

    constructor(props){
        super(props)
    }

    state = {
        idUsuario: null,
        editNome: false,
        novoNome: ''
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Header icon={"bars"} texto={"Perfil"} onPress={() => this.props.navigation.openDrawer()} />
                    <View style={StylePerfil.informacaoArea}>
                        <Icon name={"user-astronaut"} size={40} style={StylePerfil.iconUser} />
                        {this.state.editNome &&
                            <TextInput placeholder="Digite seu nome" style={StylePerfil.inputNome}
                                onChangeText={novoNome => this.setState({ novoNome })}
                                value={this.state.novoNome} maxLength={50} onSubmitEditing={() => alert(this.state.novoNome)} />
                        }
                        {!this.state.editNome &&
                            <Text style={StylePerfil.nmUsuario}>Nome usuario</Text>
                        }
                        {!this.state.editNome &&
                            <TouchableOpacity onPress={() => this.setState({ editNome: true })}>
                                <Icon name={"edit"} size={20} style={StylePerfil.iconEditName} />
                            </TouchableOpacity>
                        }
                        {this.state.editNome &&
                            <TouchableOpacity onPress={() => this.setState({ editNome: false })}>
                                <Icon name={"check"} size={20} style={[StylePerfil.iconEditName,{marginTop: "10%", marginRight: '5%'}]} />
                            </TouchableOpacity>
                        }
                    </View>
                    <InformacoesUsuario perfil tecnologias={tecnologias} descricao={"A vida é bela demais para vivermos a tarde"} email={"lucas8585@gmail.com"} />
                    
                    <Text style={StylePerfil.text}>Portfólio</Text>
                    <Text style={StylePerfil.subText}>Projetos já concluídos.</Text>

                    <ComponetPortfolio ideias={ideias} />
                </View>
            </ScrollView>
        )
    }
}