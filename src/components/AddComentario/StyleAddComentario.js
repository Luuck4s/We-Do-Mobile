import { StyleSheet } from 'react-native'
import EstiloComum from '../../EstiloComum'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000',
        borderRadius: 7,
    },
    legenda: {
        marginLeft: 10,
        fontSize: 12,
        color: '#000'
    },
    input: {
        width: '90%'
    },
    icone: {
        color: EstiloComum.cores.fundoWeDo
    }
})

export default styles