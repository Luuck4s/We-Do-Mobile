import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    IdeiaContainer: {
        padding: 5
    },
    icon: {
        color: EstiloComum.cores.fundoWeDo,
        alignSelf: 'center'
    },
    nomeIdeia: {
        fontFamily: EstiloComum.fontFamily,
        fontSize: 15,
    }
})

export default style