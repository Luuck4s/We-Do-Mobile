import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        paddingBottom: '2%',
        marginBottom: 5,
        alignItems: 'baseline',
        marginRight: 5,
        marginLeft: 5
    },
    icon:{
        color: EstiloComum.cores.fundoWeDo,
        marginLeft: '3%',
        marginRight: '3%',
    },
    titulo:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
        marginRight: 50,
        textAlign: 'justify',
    }
})


export default style