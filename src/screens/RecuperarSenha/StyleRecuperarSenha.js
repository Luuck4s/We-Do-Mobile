import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    icon:{
        marginLeft: 10,
        marginBottom: 5,
    },
    title:{
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 5,
    },
})

export default style