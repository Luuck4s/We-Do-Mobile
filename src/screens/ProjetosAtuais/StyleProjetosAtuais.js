import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    text: {
        marginTop: '2%',
        paddingTop: '2%',
        fontFamily: EstiloComum.fontFamily,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
    subText: {
        fontFamily: EstiloComum.fontFamily,
        fontSize: 14,
        textAlign: "center",
        color: '#333'
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