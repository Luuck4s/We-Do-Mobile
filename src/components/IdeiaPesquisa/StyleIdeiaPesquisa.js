import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titulo:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 20,
        color: EstiloComum.cores.fundoWeDo,
    },
    autor: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 15,
        color: '#000',
    }
})

export default styles