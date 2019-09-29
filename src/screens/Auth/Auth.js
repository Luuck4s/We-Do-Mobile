//Screen para redenizar a tela de login/cadastro do usuario 
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Switch, Alert, ToastAndroid } from 'react-native'
import Api from '../../api/Api'
import logo from '../../../assets/img/weDo_logo.png'
import AuthInput from '../../components/AuthInput/AuthInput'
import EstiloComum from '../../EstiloComum'
import AsyncStorage from '@react-native-community/async-storage'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import StyleAuth from './StyleAuth'
import { YellowBox } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

YellowBox.ignoreWarnings([
	'Warning: componentWillReceiveProps is deprecated',
]);

const tecnologias = []

export default class Auth extends Component {

	state = {
		criarConta: false,
		email_usuario: '',
		nm_usuario: '',
		senha_usuario: '',
		confirmar_senha: '',
		dt_nascimento: '',
		interesses: [],
		manterConectado: true,
	}

	componentDidMount = () => {
		this.buscaTecnologias()
	}

	/**
	 * Função que através da API busca e armazena as tecnologias que 
	 * o usuário podera escolher.
	 */
	buscaTecnologias = async () => {
		if (tecnologias.length == 0) {
			try {
				await Api.get('/tecnologia')
					.then((response) => {
						tecnologias.push(response.data)
					})
			} catch (error) {
				Alert.alert("Erro Tecnologias", `Ocorreu um erro inesperado ${error.data}`)
			}
		}
	}


	/**
	 * Função que tira a mascara da data de nascimento e coloca
	 * em ordem os numeros para salvar no banco de dados.
	 */
	ajustarData = () => {
		let dataAntiga = this.state.dt_nascimento

		let anoDataNova = dataAntiga.substring(6, 10)
		let mesDataNova = dataAntiga.substring(3, 5)
		let diaDataNova = dataAntiga.substring(0, 2)

		let dataNova = anoDataNova
			.concat('-')
			.concat(mesDataNova)
			.concat('-')
			.concat(diaDataNova)

		return `${dataNova}`
	}

	/**
	 * Funcão que verifica se o manter logado está setado como true,
	 * caso esteja salva os dados do usuario para ele não necessitar 
	 * digitar o email e a senha para se logar novamente.
	 */
	manterLogado = (data) => {
		if (this.state.manterConectado) {
			this.storeData(data)
		} else {
			return true
		}
	}

	/**
	 * Armarzenar os dados recebidos para manter logado 
	*/
	storeData = async (data) => {
		try {
			await AsyncStorage.setItem('@weDo:userData', JSON.stringify(data))
		} catch (err) {
			Alert.alert('Error Interno', `Async Store Data Error ${err}`)
		}
	}

	storeId = async (data) => {
		try {
			await AsyncStorage.setItem('@weDo:userId', JSON.stringify(data))
		} catch (err) {
			Alert.alert('Error Interno', `Async Store ID Error:${err}`)
		}
	}

	/**
	 * @interesses - recebe o interreses que é o campo que está no state que armazena
	 *  tecnologias que o usuario escolheu, caso as tecnologias passem de "numero a definir"
	 *  ele nao permite mais adicionar.
	 */
	selecionarTecnologia = (interesses) => {
		this.setState({ interesses })
	}

	/**
	 * Função assincrona que chama uma rota da API passando os dados
	 * do usuario para tentativa de ralizar um login, caso de certo
	 * troca para tela inicio, caso de errado exibi um alerta.
	*/
	logar = async () => {
		try {
			await Api.post('/usuario/login', {
				usuario: {
					email_usuario: this.state.email_usuario,
					senha_usuario: this.state.senha_usuario
				}
			}).then((response) => {
				if(response.data.err){
					ToastAndroid.show(`${response.data.err}`,ToastAndroid.SHORT)
				}else{
					Api.defaults.headers.common['Authorization'] = `${response.data.token}`
					this.manterLogado(response.data)
					this.storeId(response.data.usuario.id_usuario)
					this.props.navigation.navigate('Inicio', response.data.usuario)
				}
			})
		} catch (err) {
			Alert.alert('Error ao Logar', `Aconteceu um erro ${err}`)
		}
	}

	/**
	 * Função assincrona que usa uma rota da API para tenta realizar
	 * o cadastro do usuário, caso de certo troca para tela de login 
	 * com os campo ja preenchidos e exibindo um alerta de confirmação 
	 * de email.
	 */
	cadastrar = async () => {
		try {
			await Api.post('/usuario/cadastro', {
				usuario: {
					email_usuario: this.state.email_usuario,
					senha_usuario: this.state.senha_usuario,
					nm_usuario: this.state.nm_usuario,
					dt_nascimento: this.ajustarData(),
					tecnologias_usuario: this.state.interesses
				},
			}).then((response) => {
				if(response.data.err){
					ToastAndroid.show(`${response.data.err}`,ToastAndroid.SHORT)
				}else{
					this.setState({criarConta: false, nm_usuario: '',confirmar_senha: '',dt_nascimento: '',interesses: []})
					Alert.alert('Cadastro Concluído !', `${response.data.msg}`)
					this.setState({ criarConta: false })
				}
			})
		} catch (err) {
			Alert.alert("Erro ao Cadastrar", `Ocorreu um erro inesperado ${err}`)
		}
	}

	/**
	 * Função que verifica se vai chamar a função de cadastro ou de login
	 * de acordo com uma atributo boolean @criarConta que esta no state, caso
	 * seja true ele chama o cadastrar() e caso contraio chama o login().
	 */
	logarOuCadastrar = () => {
		if (this.state.criarConta) {
			this.cadastrar()
		} else {
			this.logar()
		}
	}

	render() {

		/**
		 * Utilizando um array guardo resultados boolean dos campos, logo apos
		 * utilizo a funcao reduce para verificar se todos os campos estão preenchidos
		 * e validados e so assim libero o botão para cadastro ou login.
		 */
		const validacao = []

		if (this.state.criarConta) {
			validacao.push(this.state.nm_usuario && this.state.nm_usuario.trim())
			validacao.push(this.state.dt_nascimento)
			validacao.push(this.state.senha_usuario && this.state.senha_usuario.length >= 6)
			validacao.push(this.state.senha_usuario == this.state.confirmar_senha)
			validacao.push(this.state.interesses && this.state.interesses.length >= 1)
		}else{
			validacao.push(this.state.email_usuario && this.state.email_usuario.includes('@'))
			validacao.push(this.state.senha_usuario && this.state.senha_usuario.length >= 6)
		}

		const validaFormulario = validacao.reduce((all, v) => all && v)

		return (
			<View style={this.state.criarConta ? StyleAuth.containerCadastrar : StyleAuth.container}>
				<Image source={logo} style={this.state.criarConta ? StyleAuth.logoCadastrar : StyleAuth.logo} />
				{this.state.criarConta &&
					<Text style={StyleAuth.subtitulo}>Cadastro</Text>
				}
				<View style={StyleAuth.formContainer}>
					{this.state.criarConta &&
						<AuthInput style={StyleAuth.input}
							icon='user'
							placeholder='Nome'
							value={this.state.nm_usuario}
							maxLength={80}
							onChangeText={nm_usuario => this.setState({ nm_usuario })} />
					}
					<AuthInput style={StyleAuth.input}
						icon='envelope'
						placeholder='Email'
						maxLength={80}
						value={this.state.email_usuario}
						onChangeText={email_usuario => this.setState({ email_usuario })} />
					{this.state.criarConta &&
						<AuthInput style={StyleAuth.input}
							icon='calendar'
							date={true}
							placeholder="Data Nascimento"
							value={this.state.dt_nascimento}
							onChangeText={dt_nascimento => this.setState({ dt_nascimento })} />
					}
					{this.state.criarConta &&
						<AuthInput icon='asterisk' placeholder='Senha'
							metade={true}
							maxLength={80}
							secureTextEntry={true}
							style={StyleAuth.inputMetadeSenha}
							value={this.state.senha_usuario}
							onChangeText={senha_usuario => this.setState({ senha_usuario })} />
					}
					{!this.state.criarConta &&
						<AuthInput icon='asterisk' placeholder='Senha'
							secureTextEntry={true}
							maxLength={80}
							style={StyleAuth.input}
							value={this.state.senha_usuario}
							onChangeText={senha_usuario => this.setState({ senha_usuario })} 
							onSubmitEditing={this.logarOuCadastrar} />
					}
					{this.state.criarConta &&
						<AuthInput style={StyleAuth.inputMetadeConfirmarSenha}
							metade={true}
							icon='asterisk'
							maxLength={80}
							placeholder='Confirmar Senha'
							secureTextEntry={true}
							value={this.state.confirmar_senha}
							onChangeText={confirmar_senha => this.setState({ confirmar_senha })} />
					}
					{this.state.criarConta &&
						<View style={StyleAuth.containerTecnologias}>
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
									selectedItems={this.state.interesses} />
							</ScrollView>
						</View>
					}
					{!this.state.criarConta &&
						<View style={StyleAuth.conectado}>
							<Switch
								thumbColor={'#FFF'}
								trackColor={{ true: '#313c4d', false: '#333'}}
								onValueChange={manterConectado => this.setState({ manterConectado })}
								value={this.state.manterConectado} />
							<Text style={StyleAuth.textManterConectado}>Manter-se Conectado</Text>
						</View>
					}
					<TouchableOpacity
						onPress={() => this.setState({ criarConta: !this.state.criarConta })}>
						<Text style={[this.state.criarConta ? [StyleAuth.textLink, { marginTop: 12 }] : StyleAuth.textLink]}>
							{this.state.criarConta
								? 'Já possui conta ?'
								: 'Cadastre-se'}
						</Text>
					</TouchableOpacity>
					{/* Implementar Politicas de privacidade */}
					{this.state.criarConta &&
						<TouchableOpacity style={{ marginTop: -4 }} onPress={() => Alert.alert('Alerta')} >
							<Text style={StyleAuth.politicas}>Políticas de Privacidade</Text>
						</TouchableOpacity>
					}
					<View style={StyleAuth.containerBotao}>
						<TouchableOpacity disabled={!validaFormulario} onPress={this.logarOuCadastrar} >
							<View style={[this.state.criarConta ? StyleAuth.botaoCadastro : StyleAuth.botao, !validaFormulario ? { backgroundColor: '#AAA' } : {}]}>
								<Text style={StyleAuth.textButton}>
									{this.state.criarConta ? 'Pronto' : 'Entrar'}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}