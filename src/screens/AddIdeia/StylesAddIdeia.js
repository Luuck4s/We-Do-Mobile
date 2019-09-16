import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#FFF',
        marginTop: '1%',
        marginLeft: '2%',
        marginRight: '2%',
    },
    icone:{
        marginTop: '3%',
        marginLeft: '5%',
        color: EstiloComum.cores.fundoWeDo
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
    button: {
        margin: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'space-around',
        width: 100,
        height: 40,
        backgroundColor: EstiloComum.cores.fundoWeDo,
    },
    header: {
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        marginTop: -40,
        borderBottomWidth: 0.4,
        borderBottomColor: '#000'
    },
    input: {
        width: '95%',
        height: 45,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000'
    },
    containerTec: {
        marginLeft: '2%',
        marginRight: '2%',
        borderWidth: 0.4,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginTop: 10,
        height: 200,
        width: '95%'
    },
    inputDesc: {
        width: '95%',
        height: 'auto',
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000'
    },
    textButton: {
        fontSize: 14,
        marginTop: '9%',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#FFF'
    }
})

export default styles