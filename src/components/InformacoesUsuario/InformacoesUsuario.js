import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, TextInput, ToastAndroid } from 'react-native'
import StyleInformacoes from './StyleInformacoes'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TecnologiaPerfil from '../TecnologiaPerfil/TecnologiaPerfil'

export default class InformacoesUsuario extends Component {

    state = {
        editDesc: false,
        novaDesc: this.props.descricao ? this.props.descricao : '',
        editEmail: false,
        novoEmail: this.props.email ? this.props.email : '',
        editSenha: false,
        senhaAtual: '',
        novaSenha: '',
    }

    componentDidMount() {
        if (this.props.email) {
            this.setState({ novoEmail: this.props.email })
        }
    }

    componentDidUpdate(PrevProps, PrevState) {
        if (this.props.email != PrevProps.email) {
            if (this.props.email) {
                this.setState({ novoEmail: this.props.email })
            }

            if (this.props.descricao) {
                this.setState({ novaDesc: this.props.descricao })
            }
        }
    }

    verificarDesc = () => {
        let descAtual = this.props.descricao || ''
        if (this.state.novaDesc.trim() != descAtual.trim()) {
            Alert.alert(
                'Confirmação',
                `Deseja realmente alterar a sua descrição ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ novaDesc: this.props.descricao ? this.props.descricao : '', editDesc: false })
                    },
                    { text: 'Confirmar', onPress: () => this.mudarDesc() }
                ]
            )
        } else {
            this.setState({ editDesc: false })
        }
    }

    verificarEmail = () => {
        if (this.state.novoEmail.trim() != this.props.email.trim()) {
            if (this.state.novoEmail.includes('@')) {
                Alert.alert(
                    'Confirmação',
                    `Deseja realmente alterar o seu email ?`,
                    [
                        {
                            text: 'Cancelar', onPress: () => this.setState({ novoEmail: this.props.email ? this.props.email : '', editEmail: false })
                        },
                        { text: 'Confirmar', onPress: () => this.mudarEmail() }
                    ]
                )
            }else{
                ToastAndroid.show('Insira um email válido', ToastAndroid.SHORT)
            }

        } else {
            this.setState({ editEmail: false })
        }
    }

    verificarSenha = () => {
        if (this.state.senhaAtual.trim() != '') {
            if (this.state.novaSenha.trim() != this.state.senhaAtual.trim()) {
                Alert.alert(
                    'Confirmação',
                    `Deseja realmente alterar a sua senha ?`,
                    [
                        {
                            text: 'Cancelar', onPress: () => this.setState({ senhaAtual: '', novaSenha: '', editSenha: false })
                        },
                        { text: 'Confirmar', onPress: () => this.mudarSenha() }
                    ]
                )
            } else {
                ToastAndroid.show('Sua nova senha precisa ser diferente da atual', ToastAndroid.SHORT)
            }
        } else {
            this.setState({ editSenha: false })
        }
    }

    mudarDesc = () => {
        this.setState({ editDesc: false })
        let dadosUsuario = []
        dadosUsuario.push(this.state.novaDesc)

        this.props.mudarDesc(dadosUsuario)
    }

    mudarEmail = () => {
        this.setState({ editEmail: false })
        let dadosUsuario = []
        dadosUsuario.push(this.state.novoEmail)

        this.props.mudarEmail(dadosUsuario)
    }

    mudarSenha = () => {
        this.setState({ editSenha: false })
        let dadosUsuario = []
        dadosUsuario.push(this.state.senhaAtual)
        dadosUsuario.push(this.state.novaSenha)

        this.props.mudarSenha(dadosUsuario)
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
        } else if (this.props.perfil) {
            return (
                <View style={StyleInformacoes.container}>
                    <View style={StyleInformacoes.containerDesc}>
                        {!this.state.editDesc &&
                            <Icon name={"quote-left"} size={10} style={StyleInformacoes.iconDesc} />
                        }
                        {!this.state.editDesc &&
                            <Text style={StyleInformacoes.textoDesc}>{this.props.descricao ? this.props.descricao : 'Sem descrição'}</Text>
                        }
                        {this.state.editDesc &&
                            <TextInput placeholder="Digite sua descrição" style={StyleInformacoes.inputDesc}
                                onChangeText={novaDesc => this.setState({ novaDesc })}
                                value={this.state.novaDesc} maxLength={150} onSubmitEditing={() => this.verificarDesc()} />
                        }
                        {!this.state.editDesc &&
                            <TouchableOpacity onPress={() => this.setState({ editDesc: true })}>
                                <Icon name={"edit"} size={20} style={StyleInformacoes.iconEditDesc} />
                            </TouchableOpacity>
                        }
                        {this.state.editDesc &&
                            <TouchableOpacity onPress={() => this.verificarDesc()}>
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
                            <TextInput placeholder="Digite seu novo email" style={StyleInformacoes.inputEmail}
                                onChangeText={novoEmail => this.setState({ novoEmail })}
                                value={this.state.novoEmail} maxLength={50} onSubmitEditing={() => this.verificarEmail()} />
                        }
                        {this.state.editEmail &&
                            <TouchableOpacity onPress={() => this.verificarEmail()}>
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
                            <View style={{ flexDirection: "row" }}>
                                <TextInput placeholder="Digite sua senha" style={StyleInformacoes.inputSenha}
                                    secureTextEntry={true}
                                    onChangeText={senhaAtual => this.setState({ senhaAtual })}
                                    value={this.state.senhaAtual} maxLength={50} />
                                <TextInput placeholder="Digite a nova senha" style={StyleInformacoes.inputSenha}
                                    secureTextEntry={true}
                                    onChangeText={novaSenha => this.setState({ novaSenha })}
                                    value={this.state.novaSenha} maxLength={50} onSubmitEditing={() => this.verificarSenha()} />
                            </View>
                        }
                        {this.state.editSenha &&
                            <TouchableOpacity onPress={() => this.verificarSenha()}>
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