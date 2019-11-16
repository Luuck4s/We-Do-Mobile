import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const style = StyleSheet.create({
    container: {
        backgroundColor: EstiloComum.cores.fundoWeDo,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
    }
})

export default style