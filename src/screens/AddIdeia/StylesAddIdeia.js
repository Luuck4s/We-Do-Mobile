import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#FFF',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    containerButton:{
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    button: {
        margin: 15,
        borderRadius: 5,
        alignItems: 'center',
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
        borderBottomWidth: 0.4,
        borderBottomColor: '#000'
    },
    input: {
        width: '90%',
        height: 35,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.4,
    },
    containerTec: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 10,
        height: 100
    },
    inputDesc: {
        width: '90%',
        height: 35,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.4,
        height: 50
    },
    textButton: {
        marginTop: '9%',
        color: 'white'
    }
})

export default styles