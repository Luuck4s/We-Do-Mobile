import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerTags:{
        flexDirection: 'row',
    },
    tag:{
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 16,
        marginLeft: '2%'
    }
})


export default styles