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
        marginBottom: 2,
        color: '#000',
        fontWeight: 'bold',
    },
    descricao: {
        marginRight: 40,
        textAlign: 'justify',
        marginTop: 10,
        marginBottom: 2,
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
    configuracoes:{
        borderRadius: 5,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
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
        marginRight: 10,
    },
    iconeConfirmTitulo:{
        alignSelf: 'flex-end',
        marginTop: -40,
        marginRight: 10,
    },
    input:{
        width: '85%',
        height: 45,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
    },
    inputDesc:{
        width: '85%',
        height: 'auto',
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000',
        marginBottom: 15,
    },
    containerTec: {
        borderWidth: 0.4,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginTop: 10,
        height: 200,
        width: '95%'
    },
    iconeButton:{
        marginTop: '9%',
        color: '#FFF'
    },
    containerButton:{
        marginTop: '8%',
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 14,
        marginTop: '9%',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#FFF'
    },
    button: {
        margin: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'space-around',
        width: 100,
        height: 40,
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    iconeEditarDesc:{
        alignSelf: 'flex-end',
        marginTop: -20,
        marginRight: 10,
    },
    iconeConfirmDesc:{
        alignSelf: 'flex-end',
        marginTop: -50,
        marginRight: 10,
    },
    iconAddTec:{
        alignSelf: 'flex-end'
    }
})

export default styles