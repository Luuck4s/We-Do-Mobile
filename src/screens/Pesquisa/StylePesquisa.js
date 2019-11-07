import {StyleSheet} from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '95%',
    },
    textoPesquisa: {
        marginTop: 5,
        textAlign: 'center',
        fontFamily: EstiloComum.fontFamily,
        color: EstiloComum.cores.fundoWeDo,
        fontSize: 18
    },
    textNoResultados:{
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
    }
})

export default styles