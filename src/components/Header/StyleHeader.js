import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowContainer2: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    image: {
        borderRadius: 100,
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    icon: {
        marginLeft: '63%'
    },
    icon2: {
        marginLeft: '3%',
    },
    title: {
        fontFamily: EstiloComum.fontFamily,
        marginLeft: '3%',
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
    },
    title2: {
        fontFamily: EstiloComum.fontFamily,
        marginLeft: '4%',
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
    },
    inputPesquisa:{
        marginLeft: '2%',
        width: '50%',
    },
    inputTec:{
        width: '44%', 
        marginTop: '2%'
    },
    iconTec: {
        marginLeft: '25%'
    }
})

export default styles