//Screen para redenizar a tela de login/cadastro do usuario 
import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	Image,
	StyleSheet,
	Switch,
	Alert
} from 'react-native'
import Api from '../api/Api'
import logo from '../../assets/img/weDo_logo.png'
import AuthInput from '../components/AuthInput'
import EstiloComum from '../EstiloComum'
import AsyncStorage from '@react-native-community/async-storage'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { YellowBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
		//implementar a busca para saber se ja tem email e senha salva e realizar o login
		this.buscaTecnologias()
	}

	/**
	 * Função que através da API busca e armazena as tecnologias que 
	 * o usuário podera escolher.
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
			Alert.alert('Error', 'Async Error')
		}
	}

	storeId = async (data) => {
		try {
			await AsyncStorage.setItem('@weDo:userId', JSON.stringify(data))
		} catch (err) {
			Alert.alert('Error', 'Async Error')
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
				Api.defaults.headers.common['Authorization'] = `${response.data.token}`
				this.manterLogado(response.data)
				this.storeId(response.data.usuario.id_usuario)
			})
			this.props.navigation.navigate('Inicio')
		} catch (error) {
			Alert.alert('Error ao Logar', `Aconteceu um erro ${error.data}`)
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
				Alert.alert('Cadastro com sucesso', `${response.data}`)
				this.setState({ criarConta: false })
			})
		} catch (error) {
			Alert.alert("Erro ao Cadastrar", `Ocorreu um erro inesperado ${error.data}`)
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

		validacao.push(this.state.email_usuario && this.state.email_usuario.includes('@'))
		validacao.push(this.state.senha_usuario && this.state.senha_usuario.length > 5)

		if (this.state.criarConta) {
			validacao.push(this.state.nm_usuario && this.state.nm_usuario.trim())
			validacao.push(this.state.dt_nascimento)
			validacao.push(this.state.confirmar_senha && this.state.confirmar_senha > 5)
			validacao.push(this.state.senha_usuario === this.state.confirmar_senha)
			validacao.push(this.state.interesses && this.state.interesses.length >= 4)
		}

		const validaFormulario = validacao.reduce((all, v) => all && v)

		return (
			<View style={this.state.criarConta ? styles.containerCadastrar : styles.container}>
				<Image source={logo} style={this.state.criarConta ? styles.logoCadastrar : styles.logo} />
				{this.state.criarConta &&
					<Text style={styles.subtitulo}>Cadastro</Text>
				}
				<View style={styles.formContainer}>
					{this.state.criarConta &&
						<AuthInput style={styles.input}
							icon='user'
							placeholder='Nome'
							value={this.state.nm_usuario}
							onChangeText={nm_usuario => this.setState({ nm_usuario })} />
					}
					<AuthInput style={styles.input}
						icon='envelope'
						placeholder='Email'
						value={this.state.email_usuario}
						onChangeText={email_usuario => this.setState({ email_usuario })} />
					{this.state.criarConta &&
						<AuthInput style={styles.input}
							icon='calendar'
							date={true}
							placeholder="Data Nascimento"
							value={this.state.dt_nascimento}
							onChangeText={dt_nascimento => this.setState({ dt_nascimento })} />
					}
					{this.state.criarConta &&
						<AuthInput icon='asterisk' placeholder='Senha'
							metade={true}
							secureTextEntry={true}
							style={{ marginTop: 10, height: 40 }}
							value={this.state.senha_usuario}
							onChangeText={senha_usuario => this.setState({ senha_usuario })} />
					}
					{!this.state.criarConta &&
						<AuthInput icon='asterisk' placeholder='Senha'
							secureTextEntry={true}
							style={styles.input}
							value={this.state.senha_usuario}
							onChangeText={senha_usuario => this.setState({ senha_usuario })} />
					}
					{this.state.criarConta &&
						<AuthInput style={[{ height: 40, marginLeft: '51%', marginTop: -39 }]}
							metade={true}
							icon='asterisk'
							placeholder='Confirmar Senha'
							secureTextEntry={true}
							value={this.state.confirmar_senha}
							onChangeText={confirmar_senha => this.setState({ confirmar_senha })} />
					}
					{this.state.criarConta &&
						<View style={{ backgroundColor: '#EEE', borderRadius: 10, marginTop: 10, height: 100 }}>
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
						<View style={styles.conectado}>
							<Switch
								thumbColor={'#FFF'}
								trackColor={{ true: '#313c4d' }}
								onValueChange={manterConectado => this.setState({ manterConectado })}
								value={this.state.manterConectado} />
							<Text style={{ marginLeft: 10, color: '#FFF', fontSize: 14 }}>Manter-se Conectado</Text>
						</View>
					}
					<TouchableOpacity
						onPress={() => this.setState({ criarConta: !this.state.criarConta })}>
						<Text style={[this.state.criarConta ? [styles.textLink, { marginTop: 12 }] : styles.textLink]}>
							{this.state.criarConta
								? 'Já possui conta ?'
								: 'Cadastre-se'}
						</Text>
					</TouchableOpacity>
					{/* Implementar Politicas de privacidade */}
					{this.state.criarConta &&
						<TouchableOpacity style={{ marginTop: -6 }} onPress={() => Alert.alert('Alerta')} >
							<Text style={styles.politicas}>Políticas de Privacidade</Text>
						</TouchableOpacity>
					}
					<View style={styles.containerBotao}>
						<TouchableOpacity disabled={!validaFormulario} onPress={this.logarOuCadastrar} >
							<View style={[this.state.criarConta ? styles.botaoCadastro : styles.botao, !validaFormulario ? { backgroundColor: '#AAA' } : {}]}>
								<Text style={styles.textButton}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: EstiloComum.cores.fundoWeDo,
		alignItems: 'center',
	},
	containerCadastrar: {
		flex: 1,
		backgroundColor: EstiloComum.cores.fundoWeDo,
	},
	logo: {
		marginTop: 20,
		width: '45%',
		height: '35%',
		resizeMode: 'contain',
	},
	logoCadastrar: {
		margin: 30,
		width: 70,
		height: 80,
		resizeMode: 'contain',
	},
	subtitulo: {
		fontFamily: EstiloComum.fontFamily,
		marginTop: -92,
		marginLeft: 120,
		textAlign: 'left',
		color: '#FFF',
		fontSize: 30,
	},
	formContainer: {
		flex: 2,
		marginTop: 8,
		padding: 17,
		width: '100%',
	},
	input: {
		width: '100%',
		height: 40,
		marginTop: 10,
		color: '#AAA'
	},
	containerBotao: {
		marginLeft: '20%',
		marginTop: 30,
		width: '60%',
	},
	botaoCadastro: {
		backgroundColor: '#FFF',
		marginTop: 8,
		padding: 8,
		alignItems: 'center',
		borderRadius: 15,
	},
	botao: {
		backgroundColor: '#FFF',
		marginTop: 40,
		padding: 8,
		alignItems: 'center',
		borderRadius: 15,
	},
	textLink: {
		fontSize: 16,
		marginRight: 8,
		color: '#FFF',
		textAlign: 'right'
	},
	textButton: {
		fontSize: 18,
		color: EstiloComum.cores.fundoWeDo,
	},
	politicas: {
		padding: 5,
		marginLeft: '2%',
		textAlign: 'left',
		marginTop: -6,
		fontSize: 14,
		color: '#FFF',
	},
	conectado: {
		width: '50%',
		height: '5%',
		flexDirection: 'row',
		marginTop: '5%'
	}
})