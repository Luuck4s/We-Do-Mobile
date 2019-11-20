import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 5,
    },
    scrollPoliticas:{
        paddingLeft: 15,
        paddingRight: 15,
        height: '93%'
    },
    ajuda:{
        fontSize: 15,
        textAlign: 'justify'   
    }
})

export default style