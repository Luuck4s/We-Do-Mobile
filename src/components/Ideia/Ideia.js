/**
 * Componente de redeniza a ideia, utilizado dentro desse componente outros componentes 
 * como o @MembroIdeia, @TecnologiaIdeia, @AddComentario.
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, ToastAndroid, StyleSheet, TextInput, ScrollView } from 'react-native'
import StyleIdeia from './StyleIdeia'
import AddComentario from '../AddComentario/AddComentario'
import TecnologiaIdeia from '../TecnologiaIdeia/TecnologiaIdeia'
import EstiloComum from '../../EstiloComum'
import MembroIdeia from '../MembroIdeia/MembroIdeia'
import Comentarios from '../Comentarios/Comentarios'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFont5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'

export default class Ideia extends Component {

    state = {
        curtido: false,
        interesse: false,
        idUsuarioAtual: null,
        qtdCurtidas: 0,
        qtdComentario: 0,
        donoIdeia: false,
        editTitulo: false,
        editDesc: false,
        novoNome: this.props.nm_ideia,
        novaDescricao: this.props.ds_ideia,
        novoStatus: 1
    }

    componentDidMount = async () => {
        await this.getIdUsuario()
        await this.ideiaCurtidaBanco()
        await this.quantidadeCurtida()
        await this.quantidadeComentario()
        await this.interesseBanco()
    }

    /**
     * Função responsavel por buscar o Id do usuario no storage
    */
    getIdUsuario = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')
        this.setState({ idUsuarioAtual: idUsuario })
    }

    /**
     * Captura a quantidade de comentarios da ideia
    */
    quantidadeComentario = () => {
        if (this.props.trends) {
            let qtd = this.props.qt_comentarios
            this.setState({ qtdComentario: qtd })
        } else {
            let qtd = this.props.comentarios.length

            this.setState({ qtdComentario: qtd })
        }
    }

    /**
     * Captura a qunatidade de curtidas da ideia
    */
    quantidadeCurtida = () => {
        this.setState({ qtdCurtidas: this.props.curtidas.length })
    }

    /**
     * Função que verifica se o usuario ja curtiu previamente a ideia
    */
    ideiaCurtidaBanco = () => {
        this.props.curtidas.map((item, index) => {
            if (this.state.idUsuarioAtual == item.id_usuario) {
                this.setState({ curtido: true })
            } else {
                this.setState({ curtido: false })
            }
        })
    }

    /**
     * Função que verifica se o usuario ja tem interesse ou se é dono da ideia e 
     * muda o estado do componente
    */
    interesseBanco = () => {
        this.props.membros.map((item, index) => {
            if (this.state.idUsuarioAtual == item.id_usuario) {
                if (item.status_solicitacao == 0) {
                    this.setState({ interesse: true })
                }

                if (item.idealizador == 1) {
                    this.setState({ donoIdeia: true })
                }
            }
        })
    }

    /**
     * Função que muda o state e espera receber uma função pela props
    */
    interesse = () => {
        if (this.state.interesse) {
            this.props.onPressInteresse()
            this.setState({ interesse: false })
            ToastAndroid.show('Interesse removido', ToastAndroid.SHORT);
        }

        if (!this.state.interesse) {
            this.props.onPressInteresse()
            this.setState({ interesse: true })
            ToastAndroid.show('Interesse adicionado', ToastAndroid.SHORT);
        }
    }

    /**
     * Função responsavel por carregar o botao de interesse de acordo com o state
    */
    renderInteresse = () => {
        if (this.state.interesse) {
            return <Icon name='check' size={20} style={StyleIdeia.iconInteresse} />
        } else {
            return <Text style={StyleIdeia.textInteresse}>Interesse</Text>
        }
    }

    /**
     * Função responsavel por alterar a cor do icone de curtida ao ser cliclado
    */
    curtida = () => {
        if (this.state.curtido) {
            this.props.onPressCurtir()
            this.setState({ curtido: false }, this.setState({ qtdCurtidas: this.state.qtdCurtidas - 1 }))

        }

        if (!this.state.curtido) {
            this.props.onPressCurtir()
            this.setState({ curtido: true }, this.setState({ qtdCurtidas: this.state.qtdCurtidas + 1 }))

        }
    }

    /**
     * Realizar a adição no números de comentarios e chamar a função para inserir no banco
     */
    adicionarComentario = (data) => {
        let qtdComentario = this.state.qtdComentario
        qtdComentario = Number(qtdComentario)
        this.setState({ qtdComentario: qtdComentario + 1 })

        this.props.adicionarComentario(data)
    }

    alterarTitulo = () => {
        let data = [this.state.novoNome]
        data.push(this.state.novaDescricao)
        data.push(this.state.novoStatus)

        this.props.alterarTitulo(data)

    }

    alterarDesc = () => {
        let data = [this.state.novoNome]
        data.push(this.state.novaDescricao)
        data.push(this.state.novoStatus)

        this.props.alterarDesc(data)

    }

    verificarAlteracao = () => {
        if (this.state.novoNome.trim() !== this.props.nm_ideia.trim() && this.state.novaDescricao.trim() !== this.props.ds_ideia.trim()) {
            Alert.alert(
                'Confirmação',
                `Deseja alterar o titulo desta ideia para "${this.state.novoNome}" e alterar a descrição para "${this.state.novaDescricao}"`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState(
                            { editDesc: false, editTitulo: false, novoNome: this.props.nm_ideia, novaDescricao: this.props.ds_ideia })
                    },
                    { text: 'Confirmar', onPress: () => this.alterarTitulo() }
                ]
            )
        } else if (this.state.editTitulo && this.state.editDesc) {
            this.setState({
                editDesc: false,
                editTitulo: false
            })
        }

        if (this.state.novaDescricao.trim() !== this.props.ds_ideia.trim() && this.state.novoNome.trim() == this.props.nm_ideia.trim()) {
            Alert.alert(
                'Confirmação',
                `Deseja alterar a descrição desta ideia para "${this.state.novaDescricao}"`,
                [
                    { text: 'Cancelar', onPress: () => this.setState({ editDesc: false, novaDescricao: this.props.ds_ideia }) },
                    { text: 'Confirmar', onPress: () => this.alterarDesc() }
                ]
            )
        } else if (this.state.editDesc) {
            this.setState({ editDesc: false })
        }

        if (this.state.novoNome.trim() !== this.props.nm_ideia.trim() && this.state.novaDescricao.trim() == this.props.ds_ideia.trim()) {
            Alert.alert(
                'Confirmação',
                `Deseja alterar o titulo desta ideia para "${this.state.novoNome}"`,
                [
                    { text: 'Cancelar', onPress: () => this.setState({ editTitulo: false, novoNome: this.props.nm_ideia }) },
                    { text: 'Confirmar', onPress: () => this.alterarTitulo() }
                ]
            )
        } else if (this.state.editTitulo) {
            this.setState({ editTitulo: false })
        }
    }


    /**
     * Exibe um alerta de confirmação para apagar a mensagem
    */
    confirmarApagar = (id_mensagem) => {
        Alert.alert(
            'Confirmação',
            'Deseja apagar este comentário ?',
            [
                { text: 'Cancelar', onPress: false },
                { text: 'Apagar', onPress: () => this.apagarComentario(id_mensagem) }
            ]
        )
    }

    /**
     * Diminui o numero de comentarios da ideia e chama uma função por props 
     * para realizar o delete da mensagem
     */
    apagarComentario = (id_mensagem) => {
        let qtdComentario = this.state.qtdComentario
        qtdComentario = Number(qtdComentario)

        this.setState({ qtdComentario: qtdComentario - 1 })

        this.props.apagarComentario(id_mensagem)
    }

    iconePosicao = () => {
        if (this.props.posicaoIdeia == 0) {
            return <IconFont5 name={'crown'} size={19} style={StyleIdeia.iconeOuro} />
        } else if (this.props.posicaoIdeia == 1) {
            return <IconFont5 name={'crown'} size={19} style={StyleIdeia.iconePrata} />
        } else {
            return <IconFont5 name={'crown'} size={19} style={StyleIdeia.iconeBronze} />
        }
    }

    render() {
        let idCriador = ''
        let idealizador = this.props.membros.map((item, index) => {
            if (item.idealizador == 1) {
                idCriador = item.id_usuario
                return item.nm_usuario
            }
        })
        if (this.props.trends) {
            return (
                <View style={[StyleIdeia.container, { paddingBottom: 8, borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <TouchableOpacity onPress={this.props.onPresNomeIdeia}>
                        <Text style={StyleIdeia.titulo}>{this.iconePosicao()} {this.props.nm_ideia}</Text>
                    </TouchableOpacity>

                    <Text style={StyleIdeia.autor} onPress={this.props.onPressAutor}>por {this.props.nm_idealizador}</Text>

                    <TecnologiaIdeia tecnologias={this.props.tecnologias} />

                    <Text style={StyleIdeia.descricao}>{this.props.ds_ideia}</Text>

                    <MembroIdeia onPressMembros={this.props.onPressMembros} membros={this.props.membros} />

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.curtida()}>
                            <Icon name='heart' style={this.state.curtido ? StyleIdeia.iconCurtido : StyleIdeia.iconCurtida} size={19} >
                                <Text style={StyleIdeia.numComentCurti}> {this.state.qtdCurtidas}</Text>
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onPressComentario}>
                            <Icon name='comment' style={StyleIdeia.iconComentario} size={19} color={EstiloComum.cores.fundoWeDo}>
                                <Text style={StyleIdeia.numComentCurti}> {this.state.qtdComentario}</Text>
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    {!this.state.donoIdeia &&
                        <TouchableOpacity style={StyleIdeia.interesse} onPress={() => this.interesse()}>
                            {this.renderInteresse()}
                        </TouchableOpacity>
                    }
                </View>
            )
        }
        if (this.props.ideiaPage) {
            return (
                <View style={StyleIdeia.container}>
                    {!this.state.editTitulo &&
                        <Text style={StyleIdeia.titulo}>{this.props.nm_ideia}</Text>
                    }
                    {this.state.editTitulo &&
                        <TextInput placeholder="Titulo da Ideia" style={StyleIdeia.input}
                            onChangeText={novoNome => this.setState({ novoNome })}
                            value={this.state.novoNome} maxLength={50} onSubmitEditing={() => this.verificarAlteracao()} />
                    }
                    {idCriador == this.state.idUsuarioAtual && !this.state.editTitulo &&
                        <IconFont5 onPress={() => this.setState({ editTitulo: true })} name={'pencil-alt'} size={20}
                            style={StyleIdeia.iconeEditar} />
                    }
                    {idCriador == this.state.idUsuarioAtual && this.state.editTitulo &&
                        <IconFont5 onPress={() => this.verificarAlteracao()} name={'check'} size={25}
                            style={StyleIdeia.iconeConfirmTitulo} />
                    }
                    <Text style={StyleIdeia.autor} onPress={this.props.onPressAutor}>por {idealizador}</Text>
                    <TecnologiaIdeia tecnologias={this.props.tecnologias} />
                    {!this.state.editDesc &&
                        <Text style={StyleIdeia.descricao}>{this.props.ds_ideia}</Text>
                    }
                    {this.state.editDesc &&
                        <TextInput placeholder="Descrição" style={StyleIdeia.inputDesc}
                            maxLength={255} onChangeText={novaDescricao => this.setState({ novaDescricao })} onSubmitEditing={() => this.verificarAlteracao()}
                            value={this.state.novaDescricao} multiline={true} />
                    }
                    {idCriador == this.state.idUsuarioAtual && !this.state.editDesc &&
                        <IconFont5 onPress={() => this.setState({ editDesc: true })} name={'pencil-alt'} size={20}
                            style={StyleIdeia.iconeEditarDesc} />
                    }
                    {idCriador == this.state.idUsuarioAtual && this.state.editDesc &&
                        <IconFont5 onPress={() => this.verificarAlteracao()} name={'check'} size={25}
                            style={StyleIdeia.iconeConfirmDesc} />
                    }
                    <MembroIdeia ideiaPage={this.props.ideiaPage} onPressMembros={this.props.onPressMembros}
                        membros={this.props.membros} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.curtida()}>
                            <Icon name='heart' style={this.state.curtido ? StyleIdeia.iconCurtido : StyleIdeia.iconCurtida} size={19} >
                                <Text style={StyleIdeia.numComentCurti}> {this.state.qtdCurtidas}</Text>
                            </Icon>
                        </TouchableOpacity>
                        <Icon name='comment' style={StyleIdeia.iconComentario} size={19} color={EstiloComum.cores.fundoWeDo}>
                            <Text style={StyleIdeia.numComentCurti}> {this.state.qtdComentario}</Text>
                        </Icon>
                    </View>

                    {!this.state.donoIdeia &&
                        <TouchableOpacity style={StyleIdeia.interesse} onPress={() => this.interesse()}>
                            {this.renderInteresse()}
                        </TouchableOpacity>
                    }
                    <AddComentario adicionarComentario={data => this.adicionarComentario(data)} />
                    <Comentarios apagarComentario={id_mensagem => this.confirmarApagar(id_mensagem)} idIdeia={this.props.idIdeia}
                        donoIdeia={this.state.donoIdeia ? true : false} comentarios={this.props.comentarios} idUsuario={this.state.idUsuarioAtual} />
                </View>
            )
        }

        if (this.props.inicio) {
            return (
                <View style={StyleIdeia.container}>
                    <TouchableOpacity onPress={this.props.onPresNomeIdeia}>
                        <Text style={StyleIdeia.titulo}>{this.props.nm_ideia}</Text>
                    </TouchableOpacity>

                    <Text style={StyleIdeia.autor} onPress={this.props.onPressAutor}>por {idealizador}</Text>

                    <TecnologiaIdeia tecnologias={this.props.tecnologias} />

                    <Text style={StyleIdeia.descricao}>{this.props.ds_ideia}</Text>

                    <MembroIdeia onPressMembros={this.props.onPressMembros} membros={this.props.membros} />

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.curtida()}>
                            <Icon name='heart' style={this.state.curtido ? StyleIdeia.iconCurtido : StyleIdeia.iconCurtida} size={19} >
                                <Text style={StyleIdeia.numComentCurti}> {this.state.qtdCurtidas}</Text>
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onPressComentario}>
                            <Icon name='comment' style={StyleIdeia.iconComentario} size={19} color={EstiloComum.cores.fundoWeDo}>
                                <Text style={StyleIdeia.numComentCurti}> {this.state.qtdComentario}</Text>
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    {!this.state.donoIdeia &&
                        <TouchableOpacity style={StyleIdeia.interesse} onPress={() => this.interesse()}>
                            {this.renderInteresse()}
                        </TouchableOpacity>
                    }
                    <AddComentario adicionarComentario={data => this.adicionarComentario(data)} />
                </View>
            )
        }
    }
}