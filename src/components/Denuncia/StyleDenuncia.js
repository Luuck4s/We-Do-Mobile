import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    denunciasAnteriores: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    novaDenuncia: {
        marginTop: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: EstiloComum.fontFamily,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
        color: EstiloComum.cores.fundoWeDo,
        alignSelf: "center"
    },
    inputDenuncia: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        fontSize: 15,
        width: '90%',
    },
    noDenunciaText:{
        fontSize: 15,
        fontFamily: EstiloComum.fontFamily,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center"
    },
    containerButton: {
        marginTop: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
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
})

export default styles