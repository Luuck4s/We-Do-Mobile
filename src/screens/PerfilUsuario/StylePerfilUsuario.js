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
    },
    shimmerAvatar:{
        marginTop: '3%',
        marginLeft: '3%',
        width: 80,
        alignSelf: 'flex-start',
        height: 80,
        borderRadius: 100,
    },
    shimmerNome: {
        marginLeft: '3%',
        width: 230,
        alignSelf: 'center',
        height: 30,
    },
    shimmerLinha:{
        marginTop: '3%',
        marginLeft: '3%',
        width: '90%',
        alignSelf: 'center',
        height: 30,
    },
    shimmerIdeia:{
        marginTop: '3%',
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    shimmerTitulo:{
        marginTop: '3%',
        width: 150,
        alignSelf: 'center',
        height: 20,
    }
})

export default style