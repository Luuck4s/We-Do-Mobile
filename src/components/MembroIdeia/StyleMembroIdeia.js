import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    containerMax: {
        flexDirection: 'column'
    },
    MeContainer: {
        flexDirection: 'row',
        marginTop: '3%',
        marginLeft: '1%',
    },
    MeContainerMax: {
        marginTop: '3%',
        marginLeft: '1%',
    },
    participantes: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14,
        color: '#333',
        marginTop: '3%',
    },
    more: {
        marginTop: '3%',
        marginLeft: '2%',
    },
    textMore: {
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 15,
        marginLeft: '2%',
        fontWeight: 'bold'
    },
    mostrarMenos: {
        marginTop: 1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: EstiloComum.cores.fundoWeDo,
    },
    iconDestaque: {
        color: '#FFD700'
    }
})

export default styles