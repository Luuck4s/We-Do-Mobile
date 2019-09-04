import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    titulo: {
        fontSize: 20,
        color: '#000',
    },
    autor: {
        marginTop: 2,
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
    },
    descricao: {
        marginTop: 5,
        fontSize: 13,
        color: '#000',
    },
    interesse: {
        marginTop: -30,
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        height: 30,
        backgroundColor: EstiloComum.cores.fundoWeDo,
        marginLeft: '70%',
    },
    textInteresse: {
        marginTop: '3%',
        color: '#FFF'
    },
    numComentCurti: {
        fontSize: 15,
    },
    iconCurtida: {
        marginTop: 10,
        color: EstiloComum.cores.fundoWeDo
    },
    iconCurtido: {
        marginTop: 10,
        color: '#900',
    },
    iconComentario: {
        marginLeft: 20,
        marginTop: 10 
    }
})

export default styles