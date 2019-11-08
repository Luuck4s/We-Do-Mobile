import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    informacaoArea: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: "space-between"
    },
    iconUser: {
        marginLeft: '3%',
        marginRight: '2%',
        color: EstiloComum.cores.fundoWeDo
    },
    nmUsuario: {
        marginLeft: '2%',
        marginTop: '2%',
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
    },
    iconEditName:{
        alignSelf: "baseline"
    },
    inputNome:{
        width: '70%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.4,
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
    },
    text:{
        marginTop: '2%',
        paddingTop: '2%',
        borderTopWidth: StyleSheet.hairlineWidth,
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
    subText:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 14,
        textAlign: "center",
        color: '#333',
        marginBottom: 5,
    }
})

export default style