import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'white',
    }, 
    containerTecnologias: {
        backgroundColor: '#EEE',
        borderRadius: 10,
        marginTop: 10,
        height: 200,
        marginLeft: "5%",
        width: '90%'
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
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
    buttonCancelar: {
        margin: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'space-around',
        width: 100,
        height: 40,
        backgroundColor: 'rgba(255,0,0,0.7)',
    },
    textButton: {
        fontSize: 14,
        marginTop: '9%',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#FFF'
    },
    iconeButton: {
        marginTop: '9%',
        color: '#FFF'
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontFamily: EstiloComum.fontFamily,
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: '2%',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
})

export default styles