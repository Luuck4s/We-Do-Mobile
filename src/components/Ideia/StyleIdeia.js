import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    titulo: {
        fontFamily: EstiloComum.fontFamily,
        fontSize: 20,
        color: EstiloComum.cores.fundoWeDo,
    },
    autor: {
        marginTop: 2,
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    descricao: {
        marginTop: 5,
        fontSize: 15,
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
    },
    iconInteresse: {
        color: '#FFF',
        marginTop: '5%',
    },
    iconeOuro:{
        color: '#FFD700'
    },
    iconePrata:{
        color: '#A7A7AD'
    },
    iconeBronze:{
        color: '#A77044'
    },
    iconeEditar:{
        alignSelf: 'flex-end',
        marginTop: -20,
    }
})

export default styles