import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listaIdeias:{
        width: '100%',
        height: '92%',
    },
    textNoFeed:{
        fontSize: 15,
        fontFamily: EstiloComum.fontFamily,
        marginTop: 10,
        textAlign: 'center'
    },
    textConexao:{
		fontSize: 15,
		textAlign: 'center',
		backgroundColor: '#900',
		width: '100%',
		color: '#FFF'
	}
})

export default styles