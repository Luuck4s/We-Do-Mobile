import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

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
	containerTecnologias:{
		backgroundColor: '#EEE',
		borderRadius: 10,
		marginTop: 10,
		height: 100,
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
		color: '#AAA',
	},
	inputMetadeSenha:{
		marginTop: 10,
		height: 40,
	},
	inputMetadeConfirmarSenha:{
		height: 40,
		marginLeft: '51%',
		marginTop: -40,
	},
	containerBotao: {
		marginLeft: '20%',
		marginTop: 30,
		width: '60%',
	},
	botaoCadastro: {
		backgroundColor: '#FFF',
		padding: 8,
		marginTop: -5,
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
		color: '#FFF',
		marginLeft: '20%'
	},
	textButton: {
		fontSize: 18,
		color: EstiloComum.cores.fundoWeDo,
	},
	politicas: {
		padding: 5,
		marginLeft: '2%',
		textAlign: 'left',
		marginTop: 5,
		fontSize: 15,
		color: '#FFF',
		width: '36%'
	},
	conectado: {
		width: '50%',
		height: '5%',
		flexDirection: 'row',
		marginTop: '5%',
	},
	textManterConectado: {
		marginLeft: 10,
		color: '#FFF',
		fontSize: 15
	},
	textConexao:{
		fontSize: 15,
		textAlign: 'center',
		backgroundColor: '#900',
		width: '100%',
		color: '#FFF'
	},
	textEsqueceu:{
		fontSize: 14,
		color: '#FFF'
	}
})


export default styles