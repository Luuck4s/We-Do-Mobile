import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl, FlatList, Alert, ToastAndroid } from 'react-native'
import Header from '../../components/Header/Header'
import AsyncStorage from '@react-native-community/async-storage'
import StylePerfil from './StylePerfil'
import Icon from 'react-native-vector-icons/FontAwesome5'
import InformacoesUsuario from '../../components/InformacoesUsuario/InformacoesUsuario'
import ComponetPortfolio from '../../components/ComponentPortifolio/ComponentPortfolio'
import ComponentProjetosAtuais from '../../components/ComponentProjetosAtuais/ComponentProjetosAtuais'
import Api from '../../api/Api'
import AdicionarTecnologiaPerfil from '../../components/AdicionarTecnologiaPerfil/AdicionarTecnologiaPerfil'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import EstiloComum from '../../EstiloComum'

export default class Perfil extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        idUsuario: null,
        editNome: false,
        novoNome: '',
        telUsuario: '',
        dtNascimento: '',
        atualizando: false,
        carregando: true,
        emailUsuario: null,
        tecnologias: [],
        dsBio: null,
        nmUsuario: null,
        portfolio: [],
        projetosAtuais: [],
        mostrarAddTec: false
    }

    componentDidMount = async () => {
        let idUsuario = await AsyncStorage.getItem('@weDo:userId')

        this.setState({ idUsuario })

        await this.pegarInformacoesUsuario()
    }

    pegarInformacoesUsuario = async () => {

        this.setState({
            portfolio: [], projetosAtuais: [], emailUsuario: null,
            tecnologias: [],
            dsBio: null,
            nmUsuario: null,
            mostrarAddTec: false
        })

        await Api.get(`/usuario/perfil/${this.state.idUsuario}&${this.state.idUsuario}`).then((response) => {

            this.setState(
                {
                    emailUsuario: response.data.perfil_usuario.email_usuario,
                    tecnologias: response.data.perfil_usuario.tecnologias,
                    dsBio: response.data.perfil_usuario.ds_bio,
                    telUsuario: response.data.perfil_usuario.tel_usuario,
                    dtNascimento: response.data.perfil_usuario.dtNascimento,
                    nmUsuario: response.data.perfil_usuario.nm_usuario,
                    novoNome: response.data.perfil_usuario.nm_usuario
                }
            )
        })

        await this.buscarProjetosEPort()

    }

    buscarProjetosEPort = async () => {
        await Api.get(`/ideia/portifolio/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == "") {
                this.setState({ Semportfolio: true, portfolio: [] })
            } else {
                this.setState({ portfolio: response.data.ideias })
            }
        })

        await Api.get(`/ideia/projetos_atuais/${this.state.idUsuario}`).then((response) => {
            if (response.data.ideias == null) {
                this.setState({ semProjetosAtuais: true, projetosAtuais: [] })
            } else {
                this.setState({ projetosAtuais: response.data.ideias })
            }

            this.setState({ carregando: false, atualizando: false })
        })
    }

    ideia = (idIdeia) => {
        let data = []

        JSON.stringify(data = {
            id_ideia: idIdeia,
            id_usuario: this.state.idUsuario,
            paginaAnteriorIdeia: "Perfil"
        })

        this.props.navigation.navigate('IdeiaPage', data)

    }

    atualizar = async () => {

        this.setState({
            portfolio: [], projetosAtuais: [], emailUsuario: null,
            tecnologias: [],
            dsBio: null,
            nmUsuario: null,
            mostrarAddTec: false,
            semProjetosAtuais: false, 
            Semportfolio: false, 
            carregando: true 
        })

        await Api.get(`/usuario/perfil/${this.state.idUsuario}&${this.state.idUsuario}`).then((response) => {

            this.setState(
                {
                    emailUsuario: response.data.perfil_usuario.email_usuario,
                    tecnologias: response.data.perfil_usuario.tecnologias,
                    dsBio: response.data.perfil_usuario.ds_bio,
                    telUsuario: response.data.perfil_usuario.tel_usuario,
                    dtNascimento: response.data.perfil_usuario.dtNascimento,
                    nmUsuario: response.data.perfil_usuario.nm_usuario,
                    novoNome: response.data.perfil_usuario.nm_usuario
                }
            )
        })

        await this.buscarProjetosEPort()
    }

    verificarMudanca = () => {
        if (this.state.novoNome.trim() != this.state.nmUsuario.trim()) {
            Alert.alert(
                'Confirmação',
                `Deseja realmente alterar o seu nome de usuario ?`,
                [
                    {
                        text: 'Cancelar', onPress: () => this.setState({ novoNome: this.state.nmUsuario, editNome: false })
                    },
                    { text: 'Confirmar', onPress: () => this.mudarNome() }
                ]
            )
        } else {
            this.setState({ editNome: false })
        }
    }

    /**
     * Função para mudar o nome
     */
    mudarNome = async () => {

        this.setState({ editNome: false })

        let idTecnologias = []

        this.state.tecnologias.map((item, index) => {
            idTecnologias.push(item.id_tecnologia)
        })

        await Api.put(`/usuario/alterar/${this.state.idUsuario}`, {
            usuario: {
                nm_usuario: this.state.novoNome,
                dt_nascimento: this.state.dtNascimento,
                ds_bio: this.state.dsBio,
                tel_usuario: this.state.telUsuario,
            },
            tecnologias: idTecnologias

        }).then((response) => {
            this.storeName(this.state.novoNome)
            ToastAndroid.show('Nome atualizado', ToastAndroid.SHORT);
        })

        await this.atualizar()
    }

    storeName = async (name) => {
        try {
            await AsyncStorage.setItem('@weDo:userName', JSON.stringify(name))
        } catch (err) {
            Alert.alert('Error Interno', `Async Store ID Error:${err}`)
        }
    }

    /**
     * Função para mudar a descrição
     */
    mudarDesc = async (data) => {
        let idTecnologias = []
        
        this.state.tecnologias.map((item, index) => {
            idTecnologias.push(item.id_tecnologia)
        })

        await Api.put(`/usuario/alterar/${this.state.idUsuario}`, {
            usuario: {
                nm_usuario: this.state.nmUsuario,
                dt_nascimento: this.state.dtNascimento,
                ds_bio: data,
                tel_usuario: this.state.telUsuario,
            },
            tecnologias: idTecnologias

        }).then((response) => {
            ToastAndroid.show('Descrição atualizada', ToastAndroid.SHORT);
        })

        await this.atualizar()
    }

    mudarSenha = async (data) => {

        Alert.alert('dasdas',`${data[0]} ${data[1]} `)

        /*await Api.put(`/usuario/alterar_senha/${this.state.idUsuario}`, {
            usuario: {
                senha_antiga: data[0],
                senha_nova: data[1]
            }

        }).then((response) => {
            if (response.data.msg) {
                ToastAndroid.show('Senha atual incorreta', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Senha atualizada', ToastAndroid.SHORT);
            }
        })*/

        await this.atualizar()
    }

    removerTecnologia = async (data) => {
        await Api.post(`/tecnologia/usuario`, {
            usuario: {
                id_usuario: this.state.idUsuario
            },
            tecnologia: {
                id_tecnologia: data
            }
        }).then((repsonse) => {
            ToastAndroid.show('Tecnologia removida com sucesso', ToastAndroid.SHORT);
        })
        await this.atualizar()
    }

    adicionarnovaTec = async (data) => {
        await Api.put(`/usuario/alterar/${this.state.idUsuario}`, {
            usuario: {
                nm_usuario: this.state.nmUsuario,
                dt_nascimento: this.state.dtNascimento,
                ds_bio: this.state.dsBio,
                tel_usuario: this.state.telUsuario,
            },
            tecnologias: data
        }).then((response) => {
            ToastAndroid.show('preferências alteradas com sucesso', ToastAndroid.SHORT);
        })

        await this.atualizar()
    }

    render() {
        renderItemPort = ({ item }) => {

            return <ComponetPortfolio key={item.id_ideia} ideia={data => this.ideia(data)} {...item} />
        }

        renderItemProj = ({ item }) => {

            return <ComponentProjetosAtuais key={item.id_ideia} ideia={data => this.ideia(data)} {...item} />
        }
        return (
            <View>
                <Header icon={"bars"} texto={"Perfil"} onPress={() => this.props.navigation.openDrawer()} />
                {this.state.carregando &&
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerAvatar} />
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerNome} />
                        </View>
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerLinha} />
                        <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerLinha} />
                        <View style={{ alignItems: 'center' }}>
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={[StylePerfil.shimmerIdeia]} />
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerTitulo} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={[StylePerfil.shimmerIdeia]} />
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerTitulo} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={[StylePerfil.shimmerIdeia]} />
                            <ShimmerPlaceHolder autoRun={true} visible={!this.state.carregando} style={StylePerfil.shimmerTitulo} />
                        </View>

                    </View>
                }
                {!this.state.carregando &&
                    <ScrollView refreshControl={this.state.carregando ? null : <RefreshControl refreshing={this.state.atualizando} onRefresh={() => this.atualizar()} />}>
                        <AdicionarTecnologiaPerfil tecnologias={this.state.tecnologias} isVisible={this.state.mostrarAddTec} adicionarnovaTec={data => this.adicionarnovaTec(data)} onCancel={() => this.setState({ mostrarAddTec: false })} />
                        <View style={{ paddingBottom: 100 }}>
                            <View style={StylePerfil.informacaoArea}>
                                <Icon name={"user-astronaut"} size={40} style={StylePerfil.iconUser} />
                                {this.state.editNome &&
                                    <TextInput placeholder="Digite seu nome" style={StylePerfil.inputNome}
                                        onChangeText={novoNome => this.setState({ novoNome })}
                                        value={this.state.novoNome} maxLength={50} onSubmitEditing={() => this.verificarMudanca()} />
                                }
                                {!this.state.editNome &&
                                    <Text style={StylePerfil.nmUsuario}>{this.state.nmUsuario}</Text>
                                }
                                {!this.state.editNome &&
                                    <TouchableOpacity onPress={() => this.setState({ editNome: true })}>
                                        <Icon name={"edit"} size={20} style={StylePerfil.iconEditName} />
                                    </TouchableOpacity>
                                }
                                {this.state.editNome &&
                                    <TouchableOpacity onPress={() => this.verificarMudanca()}>
                                        <Icon name={"check"} size={20} style={[StylePerfil.iconEditName, { marginTop: "10%", marginRight: '5%' }]} />
                                    </TouchableOpacity>
                                }
                            </View>
                            <InformacoesUsuario perfil removerTecnologia={data => this.removerTecnologia(data)} tecnologias={this.state.tecnologias} descricao={this.state.dsBio} email={this.state.emailUsuario}
                                mudarDesc={data => this.mudarDesc(data)} mudarSenha={data => this.mudarSenha(data)} />
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }} onPress={() => this.setState({ mostrarAddTec: true })}>
                                <Icon name={"plus"} size={23} style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <Text style={StylePerfil.text}>Portfólio</Text>
                            <Text style={StylePerfil.subText}>Projetos já concluídos.</Text>
                            {this.state.Semportfolio &&
                                <Text style={StylePerfil.textNoIdeias}>Você não concluiu nenhum projeto.</Text>
                            }
                            <FlatList
                                initialNumToRender={3}
                                data={this.state.portfolio}
                                keyExtractor={item => `${item.id_ideia}`}
                                renderItem={renderItemPort} />
                            <Text style={StylePerfil.text}>Projetos Atuais</Text>
                            <Text style={StylePerfil.subText}>Projetos em andamento.</Text>
                            {this.state.semProjetosAtuais &&
                                <Text style={StylePerfil.textNoIdeias}>Você não participa de nenhum projeto.</Text>
                            }
                            <FlatList
                                initialNumToRender={3}
                                data={this.state.projetosAtuais}
                                keyExtractor={item => `${item.id_ideia}`}
                                renderItem={renderItemProj} />
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}