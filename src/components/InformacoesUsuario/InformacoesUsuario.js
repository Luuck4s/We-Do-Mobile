import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import StyleInformacoes from './StyleInformacoes'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TecnologiaPerfil from '../TecnologiaPerfil/TecnologiaPerfil'

export default class InformacoesUsuario extends Component {

    state = {
        editDesc: false,
        novaDesc: '',
        editEmail: false,
        novoEmail: '',
        editSenha: false,
        novaSenha: ''
    }

    render() {
        if (this.props.perfilUsuario) {
            return (
                <View style={StyleInformacoes.container}>

                    <View style={StyleInformacoes.containerDesc}>
                        <Icon name={"quote-left"} size={15} style={StyleInformacoes.iconDesc} />
                        <Text style={StyleInformacoes.textoDesc}>{this.props.descricao}</Text>
                    </View>
                    <View style={StyleInformacoes.containerEmail}>
                        <Icon name={"envelope"} size={20} style={StyleInformacoes.iconEmail} />
                        <Text style={StyleInformacoes.textoEmail}>{this.props.email}</Text>
                    </View>

                    <View style={StyleInformacoes.containerTecnologias}>
                        <TecnologiaPerfil tecnologias={this.props.tecnologias} />
                    </View>
                </View>
            )
        } else if (this.props.perfil){
            return (
                <View style={StyleInformacoes.container}>
                    <View style={StyleInformacoes.containerDesc}>
                        {!this.state.editDesc &&
                            <Icon name={"quote-left"} size={10} style={StyleInformacoes.iconDesc} />
                        }
                        {!this.state.editDesc &&
                            <Text style={StyleInformacoes.textoDesc}>{this.props.descricao}</Text>
                        }
                        {this.state.editDesc &&
                            <TextInput placeholder="Digite sua descrição" style={StyleInformacoes.inputDesc}
                                onChangeText={novaDesc => this.setState({ novaDesc })}
                                value={this.state.novaDesc} maxLength={150} onSubmitEditing={() => alert(this.state.novaDesc)} />
                        }
                        {!this.state.editDesc &&
                            <TouchableOpacity onPress={() => this.setState({ editDesc: true })}>
                                <Icon name={"edit"} size={20} style={StyleInformacoes.iconEditDesc} />
                            </TouchableOpacity>
                        }
                        {this.state.editDesc &&
                            <TouchableOpacity onPress={() => this.setState({ editDesc: false })}>
                                <Icon name={"check"} size={20} style={StyleInformacoes.iconEditDesc} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={StyleInformacoes.containerEmail}>
                        {!this.state.editEmail &&
                            <Icon name={"envelope"} size={20} style={StyleInformacoes.iconEmail} />
                        }
                        {!this.state.editEmail &&
                            <Text style={StyleInformacoes.textoEmail}>{this.props.email}</Text>
                        }
                        {!this.state.editEmail &&
                            <TouchableOpacity onPress={() => this.setState({ editEmail: true })}>
                                <Icon name={"edit"} size={20} style={StyleInformacoes.iconEditEmail} />
                            </TouchableOpacity>
                        }
                        {this.state.editEmail &&
                            <TextInput placeholder="Digite seu email" style={StyleInformacoes.inputEmail}
                                onChangeText={novoEmail => this.setState({ novoEmail })}
                                value={this.state.novoEmail} maxLength={50} onSubmitEditing={() => alert(this.state.novoEmail)} />
                        }
                        {this.state.editEmail &&
                            <TouchableOpacity onPress={() => this.setState({ editEmail: false })}>
                                <Icon name={"check"} size={20} style={StyleInformacoes.iconEditEmail} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={StyleInformacoes.containerSenha}>
                        {!this.state.editSenha &&
                            <Icon name={"lock"} size={20} style={StyleInformacoes.iconSenha} />
                        }
                        {!this.state.editSenha &&
                            <Text style={StyleInformacoes.textoSenha}>********</Text>
                        }
                        {!this.state.editSenha &&
                            <TouchableOpacity onPress={() => this.setState({ editSenha: true })}>
                                <Icon name={"edit"} size={20} style={StyleInformacoes.iconeEditSenha} />
                            </TouchableOpacity>
                        }
                        {this.state.editSenha &&
                            <TextInput placeholder="Digite sua nova senha" style={StyleInformacoes.inputSenha}
                                onChangeText={novaSenha => this.setState({ novaSenha })}
                                value={this.state.novaSenha} maxLength={50} onSubmitEditing={() => alert(this.state.novaSenha)} />
                        }
                        {this.state.editSenha &&
                            <TouchableOpacity onPress={() => this.setState({ editSenha: false })}>
                                <Icon name={"check"} size={20} style={StyleInformacoes.iconeEditSenha} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={StyleInformacoes.containerTecnologias}>
                        <TecnologiaPerfil tecnologias={this.props.tecnologias} />
                    </View>
                </View>
            )
        }
    }
}