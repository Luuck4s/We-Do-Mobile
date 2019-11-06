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
    nmUsuario:{
        marginLeft: '2%',
        marginTop: '2%',
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
    },
    text:{
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
        color: '#333'
    }
})

export default style