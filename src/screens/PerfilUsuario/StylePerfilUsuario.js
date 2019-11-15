import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    informacaoArea:{
        flexDirection: 'row',
        padding: 5,
    },
    iconUser:{
        marginLeft: '3%',
        marginRight: '2%',
        color: EstiloComum.cores.fundoWeDo
    },
    iconDenuncia:{
        alignSelf: 'flex-end',
        color: '#900',
        marginRight: '2%',
    },
    nmUsuario:{
        marginLeft: '2%',
        marginTop: '2%',
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
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
    },
    textNoIdeias:{
        fontFamily: EstiloComum.fontFamily,
        marginTop: 5,
        fontSize: 16,
        textAlign: "center",
        color: EstiloComum.cores.fundoWeDo
    }
})

export default style