import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    header: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    icon: {
        color: '#FFF',
        marginLeft: 10,
        marginBottom: 5,
    },
    title: {
        fontFamily: EstiloComum.fontFamily,
        color: '#FFF',
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 5,
    },
    logo: {
        marginTop: 20,
        width: '45%',
        height: '35%',
        resizeMode: 'contain',
    },
    formContainer: {
        flex: 2,
        marginTop: 8,
        padding: 17,
        width: '90%',
        alignItems: 'center'
    },
    containerBotao: {
		width: '50%',
    },
    textButton: {
        fontSize: 18,
        color: EstiloComum.cores.fundoWeDo,
    },
	botao: {
		backgroundColor: '#FFF',
		marginTop: 40,
		padding: 8,
		alignItems: 'center',
		borderRadius: 15,
	},
})

export default style